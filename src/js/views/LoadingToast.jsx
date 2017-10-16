import React from "react";

const DEFAULT_INFO = "数据加载中";

export default class LoadingToast extends React.Component{

    render() {
        var {isOpen, info} = this.props,
            containerDisplay;
        info = info ? info : DEFAULT_INFO;
        containerDisplay = isOpen ? 'block' : 'none';
        return (
            <div className="fbt_loading_toast" style={{display: containerDisplay}}>
                <div className="fbt_mask_transparent"></div>
                <div className="fbt_toast">
                    <div className="fbt_loading">
                        <div className="fbt_loading_leaf fbt_loading_leaf_0"></div>
                        <div className="fbt_loading_leaf fbt_loading_leaf_1"></div>
                        <div className="fbt_loading_leaf fbt_loading_leaf_2"></div>
                        <div className="fbt_loading_leaf fbt_loading_leaf_3"></div>
                        <div className="fbt_loading_leaf fbt_loading_leaf_4"></div>
                        <div className="fbt_loading_leaf fbt_loading_leaf_5"></div>
                        <div className="fbt_loading_leaf fbt_loading_leaf_6"></div>
                        <div className="fbt_loading_leaf fbt_loading_leaf_7"></div>
                        <div className="fbt_loading_leaf fbt_loading_leaf_8"></div>
                        <div className="fbt_loading_leaf fbt_loading_leaf_9"></div>
                        <div className="fbt_loading_leaf fbt_loading_leaf_10"></div>
                        <div className="fbt_loading_leaf fbt_loading_leaf_11"></div>
                    </div>
                    <p className="fbt_toast_content">{info}</p>
                </div>
            </div>
        );
    }
}