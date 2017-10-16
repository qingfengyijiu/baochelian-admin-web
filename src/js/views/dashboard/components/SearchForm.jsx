import React from 'react';
import FormField from '../../FormField.jsx';
import AutoComplete from '../../AutoComplete.jsx';
import url from '../url.js';
import {browserHistory} from 'react-router';

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
            actions.spListAction.changeListQueryOptions(model);
        }
    }

    reset() {
      let { actions, model} = this.props;
      actions.spListAction.resetListQueryOptions();
    }

    onSearch() {
        let {actions, onSearch, model} = this.props;
        actions.spListAction.resetListPagination();
        browserHistory.push('/SP/SpListPage');
        setTimeout(onSearch, 0);
    }

    render() {
        let {model, form} = this.props;
        let upayCompanyList = _.map(form.upayCompanyList, function(item) {
          return {
            key: item.id,
            value: item.name
          }
        });
        let spList = _.map(form.spList, function(item) {
          return {
            key: item.key,
            value: item.name
          }
        })
        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                      <FormField label="SP简称">
                          <FormField.AutoCompleteForObject datas={spList} value={model.spKeyShow} valueKey={model.spKey} onChangeValue={this.onChangeField('spKeyShow').bind(this)} onChangeKey={this.onChangeField('spKey').bind(this)}/>
                      </FormField>
                        <FormField label="所属公司">
                            <FormField.Select  value={model.companyId} datas={upayCompanyList} onChange={this.onChangeField('companyId').bind(this)}/>
                        </FormField>
                    </div>
                </div>
                <div className="search-btn-container form form-search">
                    <FormField>
                        <button className="btn btn-search btn-primary" onClick={this.onSearch}>查询</button>
                    </FormField>
                    <FormField>
                        <button className="btn btn-search btn-primary" onClick={this.reset}>重置</button>
                    </FormField>
                </div>
            </div>
        )
    }
}
