import React from 'react';
import FormField from '../../FormField.jsx';

export default class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        notice:'模糊查询'
      };
      this.reset = this.reset.bind(this);
      this.onSearch = this.onSearch.bind(this);
    }

    onChangeField(field) {
        return function(value) {
            let {model, actions} = this.props;
            model[field] = value;
            actions.spAction.changeListQueryOptions(model);
        }
    }

    reset() {
      let { actions } = this.props;
      actions.spAction.resetListQueryOptions();
    }

    onSearch() {
        let {actions, onSearch} = this.props;
        actions.spAction.resetListPagination();
        setTimeout(onSearch, 0);
    }


    render() {
        let {model, onSearch, form} = this.props;
        const userTypeList = [{
            key: 1,
            value: "司机"
        }, {
            key: 2,
            value: "技师"
        }, {
            key: 3,
            value: "管理后台人员"
        }];
        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div ref = "form" className="form form-search">
                        <FormField label="用户类型">
                            <FormField.Select value={model.userType} datas={userTypeList} onChange={this.onChangeField('userType').bind(this)}/>
                        </FormField>
                        <FormField label="手机号">
                            <FormField.Input value={model.phone} onChange={this.onChangeField('phone').bind(this)}/>
                        </FormField>
                    </div>
                </div>
                <div className="search-btn-container form form-search">
                    <FormField>
                        <button className="btn btn-search btn-primary" onClick={this.onSearch}>查询</button>
                    </FormField>
                </div>
            </div>
        )
    }
}
