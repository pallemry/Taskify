import { v4 } from "uuid";

const EventsService = {
    callbacks: <any>{},

    /**
     * @param {string} eventName
     * @param {*} data
     */
    triggerEvent(eventName: string, data: any = null) {
        var returnValues: any[] = [];
        if (this.callbacks[eventName]) {
            Object.keys(this.callbacks[eventName]).forEach((id) => {
                returnValues.push(this.callbacks[eventName][id](data));
            });
        }
        return returnValues;
    },

    /**
     * @param {string} eventName name of event
     * @param {string} id callback identifier
     * @param {Function} callback
     * @returns {string} The id of the event
     */
    listenEvent(eventName: string, callback: Function) {
        const id = v4();
        this.callbacks[eventName] = {};
        this.callbacks[eventName][id] = callback;
        return id;
    },

    /**
     * @param {string} eventName name of event
     * @param {string} id callback identifier
     */
    unlistenEvent(eventName: string, id: any) {
        delete this.callbacks[eventName][id];
    }
};
export default EventsService;
