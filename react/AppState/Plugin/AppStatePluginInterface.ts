import React from "react";
import { AppState } from "@app/Types/AppTypes";
import { Subject } from "rxjs";

interface AppStatePluginInterface {

    initialize(initValuesSubject: Subject<{}>, plugin: any, stateSubject: Subject<{}>): void;

}

export type { AppStatePluginInterface };