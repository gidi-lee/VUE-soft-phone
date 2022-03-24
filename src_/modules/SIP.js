import { Web } from "sip.js";
class SIP {
    constructor(phone) {
        this.phone = phone
        var self = this
        this.simpleUserDelegate = {
            onCallCreated() {
                console.log(`Call created`);


            },
            onCallAnswered() {
                console.log(`Call answered`, phone);
                this.phone.changeState("Call")

            },
            onCallHangup() {
                console.log(`Call hangup`);
                self.changeState("Hangup")

            },
            onCallHold(held) {
                console.log(`[${this.displayName}] Call hold ${held}`);
                this.phone.changeSubStatus("muteState", held)
            },
            onReject() {
                console.log("Reject");
                self.changeState("Error")
            }
        }
        this.simpleUserOptions = {
            delegate: this.simpleUserDelegate,
            media: {
                remote: {
                    audio: self.phone.remoteAudio
                }
            },
            userAgentOptions: {
                displayName: this.phone.displayName //TODO change to ?
            }
        }
    }
    initPhone() {
        console.log(`init phone, remove audio ${this.simpleUserOptions.media.remote}`)
        this.simpleUserOptions.media.remote.audio = this.phone.remoteAudio
        this.simpleUser = new Web.SimpleUser(this.phone.sipRouter, this.simpleUserOptions)

        this.simpleUser.connect().then(
            () => {
                this.phone.changeState("Dialing")
            }
        ).catch(
            (io) => {
                console.error("pizdets", io) //TODO what do we need to do in case of an error?
                this.changeState("Error")
            });
    }
    resetPhone() {

    }
    call(number) {
        this.simpleUser.call(`sip:${number}@${this.phone.realm}`)
            .catch((io) => { //TODO how an unanswered call are presented?
                console.error(`call failed `, io);
                this.changeStatus("Error")
            });
    }
    sendDTMF(digit) {
        this.simpleUser.sendDTMF(digit).then(() => {
            this.phone.updateSubState("digitPressState", digit)

        }).catch(() => {
            console.error("key was not recieved") //TODO what do we need to do in case of an error?
        });
    }
    hangup(digit) {
        this.simpleUser.hangup(digit).catch(() => {
        }).catch(() => {
            console.error("key was not recieved") //TODO what do we need to do in case of an error?
        });
    }
    mute() {
        if (!this.simpleUser.isMuted()) {
            // Checkbox is checked..
            this.simpleUser.mute();
            if (this.simpleUser.isMuted() === false) {
                console.error(`[${this.simpleUser.id}] failed to mute call`);
                alert("Failed to mute call.\n");
                return
            }
            this.phone.updateSubState("muteState", true)

        } else {
            // Checkbox is not checked..
            this.simpleUser.unmute();
            if (this.simpleUser.isMuted() === true) {

                console.error(`[${this.simpleUser.id}] failed to unmute call`);
                alert("Failed to unmute call.\n");
                return
            }
            this.phone.updateSubState("muteState", false)

        }
    }


}
export default SIP