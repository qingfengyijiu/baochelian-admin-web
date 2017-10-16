import React from 'react';
import FormField from '../../FormField.jsx';
import {ws} from '../../../lib/main.js';
import history from '../../history.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.state={
          appNameList:[]
        };
    }

    // componentDidMount(){
    //     let _this = this;
    //     ws.get({
    //       url:'/api/appKeyAndNameList'
    //     }).then(function(response){
    //       if(response.code == 0){
    //         console.log(response.data);
    //         _this.setState({
    //             appNameList: response.data
    //         })
    //       }
    //     })
    // }

    onChangeField(field) {
        return function(value) {
            let {model, actions, pagination} = this.props;
            model[field] = value;
            actions.appAction.changeListQueryOptions(model);
        }
    }

    onSearch() {
        let {actions, onSearch} = this.props;
        actions.appAction.resetListPagination();
        onSearch();
        setTimeout(onSearch,0);
    }

    onReset() {
      let {actions, onSearch} = this.props;
      actions.appAction.resetListQueryOptions();
      history.push('/app');
    }

    render() {
        let {model, onSearch} = this.props;

        let appNameList = _.map(this.state.appNameList,function(item){
          return{
            key:item.id,
            value: item.name
          }
        })

        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                        <FormField label="APP名称">
                          {/* <FormField.AutoCompleteForObject datas={appNameList} value={model.appNameShow} valueKey={model.name} onChangeValue={this.onChangeField('appNameShow').bind(this)}
                          onChangeKey={this.onChangeField('name').bind(this)}/> */}
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
