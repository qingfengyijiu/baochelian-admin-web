import React from 'react';
import FormField from '../../FormField.jsx';
import {ws} from '../../../lib/main.js';
import history from '../../history.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.state={
          cpName:"",
          appNameList:[]
        };
    }

    componentDidMount(){
      //获取url地址
      // var url = location.href;
      // var id = url.split("/");
      // var id = id[id.length-1];
      let _this = this;
      ws.get({
        url:'/api/cpKeyAndNameList'
      }).then(function(response){
        if(response.code == 0){
          _this.setState({
              cpNameList: response.data
          })
        }
      });
    }

    onChangeField(field) {
        return function(value) {
            let {model, actions, pagination} = this.props;
            model.appKey = null;
            model[field] = value;
            actions.appAction.changeListQueryOptions(model);
        }
    }

    // componentWillUnmount(){
    //     let {model,actions} = this.props;
    //     model['name'] = null;
    //     actions.appAction.changeListQueryOptions(model);
    // }

    onSearch() {
        let {actions, onSearch} = this.props;
        actions.appAction.resetListPagination();
        setTimeout(onSearch, 0);
    }

    onReset() {
      let {actions, onSearch} = this.props;
      // window.location.href = '/app';
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
        });

        let cpNameList = _.map(this.state.cpNameList,function(item){
          return{
            key: item.key,
            value: item.name
          }
        });

        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                      <FormField label="CP简称">
                        <FormField.AutoCompleteForObject datas={cpNameList} value={model.cpName} valueKey={model.cpKey} onChangeValue={this.onChangeField('cpName').bind(this)}
                        onChangeKey={this.onChangeField('cpKey').bind(this)}/>
                      </FormField>
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
