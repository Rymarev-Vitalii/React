var React = require('react');
var createReactClass = require('create-react-class');
require('./first.css');
const imgcompleted=require('./img/1.jpg');
const imgnew=require('./img/2.jpg');

var myobj = JSON.parse(localStorage.getItem('todo'));
var Main = createReactClass({
	getInitialState: function() {
		if(!localStorage.getItem('todo')){
			var zagotovka=[];
			localStorage.setItem("todo", JSON.stringify(zagotovka));
		}
        return {
        	obj:myobj,
        	mass:0,
        	text:"",
        	radiostatus:1,
        	firstsatus:true
        };
    },
    TextChange:function(event){
    	this.setState({text:event.target.value});
    },
    //Создание новой строки
    click: function(){
    	if(this.state.text==""){
    		alert("Please enter the text");
    	}
    	else{
			this.state.obj.push({text:`${this.state.text}`,status:true, id: Date.now()});
			this.setState({obj:this.state.obj});
			localStorage.clear();
			localStorage.setItem("todo", JSON.stringify(this.state.obj));
			this.setState({text:""});
		}
		document.getElementById('All').checked = true;
		this.setState({radiostatus:1});
	},

	//Удаление строки
	proba: function(num) {
        var numId = num.id;
        var newNotes = this.state.obj.filter(function(note) {
            return note.id !== numId;
        });
        this.setState({obj:newNotes});
        this.state.obj=newNotes;
        localStorage.clear();
        localStorage.setItem("todo", JSON.stringify(newNotes));
    },

    //onCheckBox
    proverka: function(num) {
		var numId = num.id;
        var targetString = this.state.obj.filter(function(note) {//Убираем и меняем статус строки
            return note.id === numId;
        });
        if(num.status==true){
        	targetString[0].status=false;
        	this.proba(num);
        	this.state.obj.unshift(targetString[0]);
    	}
    	else{
    		targetString[0].status=true;
    		this.proba(num);
    		this.state.obj.push(targetString[0]);
    	}


        this.setState({obj:this.state.obj});
		localStorage.clear();
		localStorage.setItem("todo", JSON.stringify(this.state.obj));	
    },
    //Рендер строк
    test: function(){
    	var onNoteDelete = this.proba;
		var onChangeStatus=this.proverka;
		this.state.mass=this.state.obj;
		if(this.state.radiostatus==2){
			this.state.mass=this.state.mass.filter(function(note) {
		        return note.status == true;
		    });
		}
		if(this.state.radiostatus==3){
			this.state.mass=this.state.mass.filter(function(note) {
		        return note.status == false;
		    });
		}

    	return (this.state.mass.map(function(num) 
			{return (
				<Note text={num.text} change={onNoteDelete.bind(null, num)} 
				status={num.status} key={num.id} proverka={onChangeStatus.bind(null, num)}>
                </Note>
			)}
		));
		this.state.mass=this.state.obj;
    },
    che1(){
    	this.setState({radiostatus:1});
    	this.setState({firstsatus:true});
    },
    che2(){
    	this.setState({radiostatus:2});
    	this.setState({firstsatus:false});
    },
    che3(){
    	this.setState({radiostatus:3});
    	this.setState({firstsatus:false});
    },
    _handleKeyPress: function(e) {
	    if (e.key === 'Enter') {
	    	this.click();
	    }
    },
	render: function(){
		var onNoteDelete = this.proba;
		var onChangeStatus=this.proverka;
		return (
			<div className="main">
				<div className="editor">
					<textarea
	                    placeholder="What you need to do?"
	                    rows={1}
	                    className="textarea"
	                    value={this.state.text}
	                    onChange={this.TextChange}
	                    onKeyPress={this._handleKeyPress}
	                />
                </div>
                <div className="list">
                	{this.test()}
                </div>
				<div className="panel">
					<input id="All" name="radio" type="radio" onChange={this.che1} checked={this.state.firstsatus}></input>
					<label htmlFor="All" value="nedzen" type="text" >All</label>
					<input id="New" name="radio" type="radio" onChange={this.che2}></input>
					<label htmlFor="New" value="nedzen" type="text">New</label>
					<input id="Completed" name="radio" type="radio" onChange={this.che3}></input>
					<label htmlFor="Completed" value="nedzen" type="text">Completed</label>
				</div>
			</div>
		);
	}
});

var Note = createReactClass({
    render: function() {
    	var NameSlass="waiting";
    	var img=0;
    	if(this.props.status==false)
    		{
    			NameSlass="done";
    			img=imgcompleted;
    		}
    	else{
    		img=imgnew;
    	}
        return (
            <div className={NameSlass}>
          	    <label>
             	<img src={img} className="string"/>
                <input type="checkbox" onChange={this.props.proverka} checked={!this.props.status}></input>
                </label>
	            	{this.props.text}   
	            	{this.props.status}
                <span onClick={this.props.change}>×</span>
            </div>
        );
    }
});


module.exports = Main;