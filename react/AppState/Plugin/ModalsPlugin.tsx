import { AppStatePluginInterface } from "@app/AppState/Plugin/AppStatePluginInterface";
import { ModalProps } from "@app/Modal";
import { AppState, ModalConfig } from "@app/Types/AppTypes";
import { Subject } from "rxjs";
import { v4 as uuidv4 } from 'uuid';


enum ModalsPluginEvent {
    ADD = "add",
    REMOVE = "remove",
}

type ModalPluginEvent = {
    event: ModalsPluginEvent,
    data: ModalProps
};

export { ModalsPluginEvent };
export type { ModalPluginEvent };

class ModalsPlugin implements AppStatePluginInterface {

    initialize(initValuesSubject: Subject<{}>, plugin: any, stateSubject: Subject<{}>): void {

        initValuesSubject.next({
            modals: []
        });

        plugin.subscribe({
            next: (v: ModalPluginEvent) => {

                switch (v.event) {

                    case ModalsPluginEvent.ADD:
                        {
                            let modalConfig = v.data;

                            let tmp = [];
                            modalConfig.id = uuidv4();
                            tmp.push(modalConfig);
                            stateSubject.next({ modals: tmp });
                        }
                        break;
                    case ModalsPluginEvent.REMOVE:
                        {
                            let id = v.data.id;
                            let tmp: ModalConfig[] = [];

                            let index = tmp.findIndex((e) => e.id == id);
                            if (index !== -1) {
                                tmp.splice(index, 1);
                            }

                            stateSubject.next({ modals: tmp });
                        }
                        break;
                }
            },
        });
    }
}



export default ModalsPlugin;