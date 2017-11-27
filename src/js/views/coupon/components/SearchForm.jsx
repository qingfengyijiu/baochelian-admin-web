import React from 'react';
import FormField from '../../FormField.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    onChangeField(field) {
        return function(value) {
            let {model, actions, pagination} = this.props;
            model[field] = value;
            if(field == 'cpName'){
              value = '';
            }
            actions.thisAction.changeListQueryOptions(model);
        }
    }

    onSearch = () => {
        let {actions, onSearch, model} = this.props;
        actions.thisAction.resetListPagination();
        setTimeout(onSearch, 0);
    }

    onReset() {
      let {actions, onSearch} = this.props;
      actions.thisAction.resetListQueryOptions();
    }

    render() {
        let {model} = this.props;

        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                        <FormField label="优惠券名称">
                          <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
                        </FormField>
                    </div>
                </div>
                <div className="search-btn-container form form-search">
                    <FormField>
                        <button className="btn btn-primary" onClick={this.onSearch}>查询</button>
                    </FormField>
                    <FormField>
                        <button className="btn btn-primary" onClick={this.onReset.bind(this)}>重置</button>
                    </FormField>
                </div>
            </div>
        )
    }
}
