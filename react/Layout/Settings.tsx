import React from "react"
import DefaultBottom from "@app/Component/DefaultBottom"
import DefaultCenter from "@app/Component/DefaultCenter"
import DefaultLeft from "@app/Component/DefaultLeft"
import DefaultRight from "@app/Component/DefaultRight"
import DefaultTop from "@app/Component/DefaultTop"


enum LayoutSettings {
    DefaultTopComp = 'top',
    DefaultBottomComp = 'bottom',
    DefaultLeftComp = 'left',
    DefaultCenterComp = 'center',
    DefaultRightComp = 'right',
}


interface LayoutConfig {

    getDefaultTopComp<T>(): T
    getDefaultBottomComp<T>(): T
    getDefaultLeftComp<T>(): T
    getDefaultCenterComp<T>(): T
    getDefaultRightComp<T>(): T
}

class ConfigClass implements LayoutConfig {
    getDefaultTopComp<T>(): T {
        return DefaultTop() as T;
    }
    getDefaultBottomComp<T>(): T {
        return DefaultBottom() as T;
    }
    getDefaultLeftComp<T>(): T {
        return DefaultLeft() as T;
    }
    getDefaultCenterComp<T>(): T {
        return DefaultCenter() as T;
    }
    getDefaultRightComp<T>(): T {
        return DefaultRight() as T;
    }
}

export const Config = new ConfigClass();
