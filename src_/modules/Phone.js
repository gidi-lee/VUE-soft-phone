import PhoneStates from "./PhoneStates"
import SIP from "./SIP"
class Phone {
    constructor(vueUpdateState, vueUpdateSubState, remoteAudio) {
        this.vueUpdateState = vueUpdateState
        this.vueUpdateSubState = vueUpdateSubState
        this.remoteAudio = remoteAudio
        const url = new URL(location.href).searchParams;
        const did = url.get("did");
        if (did && did != "") {
            this.did = did;
        } else {
            console.log(Error); //TODO move to error state
        }

        const cn = url.get("company_name");
        if (cn) {
            this.companyName = cn;
        }
        const lang = url.get("lang");
        if (lang) {
            this.lang = lang;
        }
        const sipRouter = process.env.VUE_APP_SIP_ROUTER;
        if (!sipRouter || sipRouter == "") {
            console.log("not sip Router configured"); //TODO move to error
        } else {
            this.sipRouter = sipRouter;
        }
        const realm = process.env.VUE_APP_REALM;
        if (realm && realm != "") {
            this.realm = realm;
        } else {
            console.log("not realm  configured"); //TODO move to error
        }
        this.displayName = "foobar"
        console.log("Starting phone ")
        this.sip = new SIP(this) //TODO get displayName and audio element
        this.phoneStates = new PhoneStates(this)
    }

    changeState(state) {
        this.phoneStates.changeState(state)
    }

    updateState(state) {
        this.state = state
        this.vueUpdateState(this.state)
    }

    changeSubState(subState, status) {
        this.phoneStates.changeSubState(subState, status)
    }

    updateSubState(subState, status) {
        this.vueUpdateSubState(subState, status)
    }


}
export default Phone