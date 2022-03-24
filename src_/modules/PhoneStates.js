class PhoneStates {
    constructor(phone) {

        this.phone = phone
        this.InitialState = "NotInit"
        this.state = ""
        this.states = {
            NotInit: {
                state: "NotInit",
                allowedStates: ["Initilazing", "Close"]
            },
            Initilazing: {
                state: "Initilazing",
                allowedStates: ["Dialing", "Hangup", "Error"],
                onEnter: () => {
                    console.log("Init ", this)
                    this.phone.sip.initPhone()
                    // setTimeout(() => { self.changeState("Dialing") }, 2000)
                }
            },
            Dialing: {
                state: "Dialing",
                allowedStates: ["Call", "Hangup", "Error"],
                onEnter: () => {

                    console.log("Dialing ", this)
                    // setTimeout(() => { self.changeState("Call") }, 2000)
                    this.phone.sip.call(this.phone.did)
                }
            },
            Call: {
                state: "Call",
                allowedStates: ["Hangup", "Error"],
                onEnter: () => {
                    //Init the phone here

                    console.log("Call ", this)
                },
                subStatuses: {
                    digitPressState: {
                        subStatus: "digitPressState",
                        change: (digit) => {
                            var self = this

                            console.log(`got digitPressState change, current ${this}, change to ${digit}`)
                            self.phone.sip.sendDTMF(digit)
                            // self.updateSubState("digitPressState", digit)

                        }
                    },
                    muteState: {
                        subStatus: "muteState",
                        change: (state) => {
                            var self = this
                            console.log(`got muteState change, current ${this.subStatus}, change to ${state}`)
                            self.phone.sip.mute()

                        }
                    },
                }

            },
            Hangup: {
                state: "Hangup",
                allowedStates: ["Reset", "Close"],
                onEnter: () => {
                    //Init the phone here
                    this.phone.sip.hangup()

                }
            },
            Error: {
                state: "Error",
                allowedStates: ["RedialPage"],
            },
            RedialPage: {
                state: "RedialPage",
                allowedStates: ["Reset", "Close"],
            },
            Reset: {
                state: "Reset",
                allowedStates: ["Initilazing"],
                onEnter: () => {
                    var self = this

                    console.log("Init ", this)
                    setTimeout(() => { self.changeState("Initilazing") }, 2000)
                }
            },
            Close: {
                state: "Close",
                allowedStates: [],
                onEnter: () => {
                    //Init the phone here
                    console.log("bye bye ;-)")
                    window.close()
                }
            },
        }
        this.changeState(this.InitialState)
    }
    changeState(ns) {
        var newState = this.states[ns]
        if (newState == undefined) {
            console.log(`changeState state ${ns} not found, ignore`)
            return
        }

        const curState = this.states[this.state]
        if (curState == undefined || curState.allowedStates.includes(ns)) {
            //Apply the new state
            console.log(`changeState Changing to ${newState.state} from ${curState ? curState.state : "undefined"}`)
            this.state = ns
            this.phone.updateState(this.state)
            if (newState.onEnter != undefined) {
                newState.onEnter();
            }
        } else {
            console.log(`changeState currnet state ${curState.state} does not allow change to the new state ${ns} , ignoring`)
            return
        }
    }
    changeSubState(subState, status) {
        var curState = this.states[this.state]
        if (curState == undefined) {
            console.log(`changeSubState curState ${this.state} not found`)
            return
        }
        if ("subStatuses" in curState && subState in curState.subStatuses) {
            var curSubState = curState.subStatuses[subState]
            if ("change" in curSubState)
                curSubState.change(status)
        } else {
            console.log(`changeSubState status ${this.state} does not contain the ${subState} sub status`)
            return
        }
    }
    updateSubState(subState, status) {
        this.phone.updateSubState(subState, status)
    }

}

export default PhoneStates