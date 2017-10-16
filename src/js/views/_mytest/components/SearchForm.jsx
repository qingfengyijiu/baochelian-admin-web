import React from 'react';
import FormField from '../../FormField.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
    }

    onChangeField(field) {
        return function(value) {
            let {model, actions, pagination} = this.props;
            model[field] = value;
            actions.cpAction.changeListQueryOptions(model);
        }
    }

    onSearch() {
        let {actions, onSearch} = this.props;
        actions.cpAction.resetListPagination();
        onSearch();
    }

    render() {
        let {model, onSearch} = this.props;
        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                        <FormField label="CP名称:">
                            <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
                        </FormField>
                    </div>
                </div>
                <div className="search-btn-container form form-search">
                    <FormField>
                        <button className="btn btn-primary" onClick={onSearch}>查询</button>
                    </FormField>
                </div>
            </div>
        )
    }
}