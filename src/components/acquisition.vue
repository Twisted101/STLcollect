<template>
	<div>
		<div id="toolbar" class="btn-group">
			<button id="btn_add" type="button" class="btn btn-default" data-toggle="modal" data-target="#myModalAdd" v-on:click="initModal">
				<span class="glyphicon glyphicon-plus" aria-hidden="true" style="color: #286090;"></span>&nbsp;添加
			</button>
			<button id="btn_edit" type="button" class="btn btn-default" data-toggle="modal" v-bind:data-target="modalType" v-on:click="show">
				<span class="glyphicon glyphicon-pencil" aria-hidden="true" style="color: #28b779;"></span>&nbsp;修改
			</button>
			<button id="btn_delete" type="button" class="btn btn-default" data-toggle="modal" data-target="#confirmDelete">
				<span class="glyphicon glyphicon-remove" aria-hidden="true" style="color: #D9534F;"></span>&nbsp;删除
			</button>
		</div>
		<table id="tb_departments" v-on:mouseenter="colResizable"></table>
		<!-- 添加的模态框 -->
		<div class="modal fade bs-example-modal-sm" id="myModalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<div>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								<span class="white">&times;</span>
							</button>
							<label>添加采集单元</label>
						</div>
					</div>
					<div class="modal-body">
						<div class="row " style="line-height: 30px; ">
							<label class="control-label col-xs-12 col-md-2 align-left">名称:</label>
							<input type="text " style="height: 30px; " class="col-xs-offset-1 col-xs-9 col-md-offset-0 col-md-7" placeholder="请输入名称 " v-model="addData.name" v-on:keyup="addNameKeyup" v-on:blur="addNameBlur"/>
							<div class="col-xs-2">
								<a href="# " tabindex="-1 " title="该项不能为空!" v-show='addNameStar'>
									<span>*</span>
								</a>
								<a href="#" tabindex="-1" v-bind:title="addNameTitle" v-show='addNameBooleans'>
									<i class="glyphicon glyphicon-warning-sign" style="color: red;"></i>
								</a>
							</div>
						</div>
						<div class="row" style="line-height: 30px;">
							<label class="control-label col-xs-12 col-md-2 align-left">通讯接口:</label>
							<select style="height: 30px;" class="col-xs-offset-1 col-xs-9 col-md-offset-0 col-md-7" v-model="addData.interface" id="addSelect">
								<option v-for="litm in communicationList" v-bind:value="litm.name" v-bind:data-id="litm.id">{{litm.name}}</option>
							</select>
							<div class="col-xs-2">
								<a href="#" tabindex="-1" title="该项不能为空!" v-show='addInterfaceStar'>
									<span>*</span>
								</a>
							</div>
						</div>
						<div class="row" style="line-height: 30px;">
							<label class="control-label col-xs-12 col-md-2 align-left">编码:</label>
							<input type="text" style="height: 30px;" class="col-xs-offset-1 col-xs-9 col-md-offset-0 col-md-7" placeholder="请输入编码" v-model="addData.coding" v-on:keyup="addCodingKeyup" v-on:blur="addCodingBlur" />
							<div class="col-xs-2">
								<a href="#" tabindex="-1" title="该项不能为空!" v-show='addCodingStar'>
									<span>*</span>
								</a>
								<a href="#" tabindex="-1" v-bind:title='addCodingTitle' v-show='addCodingBooleans'>
									<i class="glyphicon glyphicon-warning-sign" style="color: red;"></i>
								</a>
							</div>
						</div>
						<div class="row" style="line-height: 30px;">
							<label class="control-label col-xs-12 col-md-2 align-left">备注:</label>
							<input type="text" style="height: 30px;" class="col-xs-offset-1 col-xs-9 col-md-offset-0 col-md-7" placeholder="请输入备注" v-model="addData.remark" />
						</div>
					</div>
					<div class="modal-footer no-margin-top">
						<button class="btn btn-sm btn-danger" data-dismiss="modal">取消</button>
						<button class="btn btn-sm btn-success" data-dismiss="modal" v-on:click="add" v-bind:disabled="addButtonShow">确定</button>
					</div>
				</div>
			</div>
		</div>
		<!-- /添加的模态框 -->
		<!-- 修改的模态框 -->
		<div class="modal fade bs-example-modal-sm" id="myModalModify" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<div>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								<span class="white">&times;</span>
							</button>
							<label>修改采集单元</label>
						</div>
					</div>
					<div class="modal-body">
						<div class="row" style="line-height: 30px;">
							<label class="control-label col-xs-12 col-md-2 align-left">名称:</label>
							<input type="text" style="height: 30px;" class="col-xs-offset-1 col-xs-9 col-md-offset-0 col-md-7" placeholder="请输入名称" v-model="modifyData.name" v-on:keyup="modifyNameKeyup" v-on:blur="modifyNameBlur" />
							<div class="col-sm-2 col-xs-2 control-tip">
								<a href="#" tabindex="-1" title="该项不能为空!" v-show='modifyNameStar'>
									<span>*</span>
								</a>
								<a href="#" tabindex="-1" v-bind:title="modifyNameTitle" v-show='modifyNameBooleans'>
									<i class="glyphicon glyphicon-warning-sign" style="color: red;"></i>
								</a>
							</div>
						</div>
						<div class="row" style="line-height: 30px;">
							<label class="control-label col-xs-12 col-md-2 align-left">通讯接口:</label>
							<select style="height: 30px;" class="col-xs-offset-1 col-xs-9 col-md-offset-0 col-md-7" v-model="modifyData.interface" id="modifySelect">
								<option v-for="litm in communicationList" v-bind:value="litm.name" v-bind:data-id="litm.id">{{litm.name}}</option>
							</select>
							<div class="col-sm-2 col-xs-2 control-tip">
								<a href="#" tabindex="-1" title="该项不能为空!" v-show='modifyInterfaceStar'>
									<span>*</span>
								</a>
							</div>
						</div>
						<div class="row" style="line-height: 30px;">
							<label class="control-label col-xs-12 col-md-2 align-left">编码:</label>
							<input type="text" style="height: 30px;" class="col-xs-offset-1 col-xs-9 col-md-offset-0 col-md-7" placeholder="请输入编码" v-model="modifyData.coding" v-on:keyup="modifyCodingKeyup" v-on:blur="modifyCodingBlur" />
							<div class="col-sm-2 col-xs-2 control-tip">
								<a href="#" tabindex="-1" title="该项不能为空!" v-show='modifyCodingStar'>
									<span>*</span>
								</a>
								<a href="#" tabindex="-1" v-bind:title='modifyCodingTitle' v-show='modifyCodingBooleans'>
									<i class="glyphicon glyphicon-warning-sign" style="color: red;"></i>
								</a>
							</div>
						</div>
						<div class="row" style="line-height: 30px;">
							<label class="control-label col-xs-12 col-md-2 align-left">备注:</label>
							<input type="text" style="height: 30px;" class="col-xs-offset-1 col-xs-9 col-md-offset-0 col-md-7" placeholder="请输入备注" v-model="modifyData.remark" />
						</div>
					</div>
					<div class="modal-footer no-margin-top">
						<button class="btn btn-sm btn-danger" data-dismiss="modal">取消</button>
						<button class="btn btn-sm btn-success" data-dismiss="modal" v-on:click="modify" v-bind:disabled="modifyButtonShow">确定</button>
					</div>
				</div>
			</div>
		</div>
		<!-- /修改的模态框 -->
		<!-- 提示无法进行修改/删除操作的模态框 -->
		<div class="modal fade bs-example-modal-sm" id="myModalError" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<div>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								<span class="white">&times;</span>
							</button>
							<span>警告</span>
						</div>
					</div>
					<div class="modal-body">
						<h5>{{modalMessage}}</h5>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-sm btn-success" data-dismiss="modal">确定</button>
					</div>
				</div>
			</div>
		</div>
		<!-- /提示无法进行修改/删除操作的模态框 -->
		<!-- 提示是否删除的模态框 -->
		<div class="modal fade bs-example-modal-sm" id="confirmDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<div>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								<span class="white">&times;</span>
							</button>
							<span>删除确认</span>
						</div>
					</div>
					<div class="modal-body">
						<h5>确认删除所选中的采集单元吗？</h5>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-sm btn-success" data-dismiss="modal" v-on:click="remove">确定</button>
					</div>
				</div>
			</div>
		</div>
		<!--   /提示是否删除的模态框 -->
	</div>
</template>
<script type="text/javascript">
	export default {
		data: function() {
			return {
				colResizableBooleans:true,//表格调宽的函数只执行一次
				communicationList: [], //从communication传来的数据
				modalMessage: '',
				tableList: [], //数据数组
				modifyButtonBooleans: false,
				addNameStar:true,
				addInterfaceStar:false,
				addCodingStar:true,
				modifyNameStar:true,
				modifyInterfaceStar:false,
				modifyCodingStar:true,
				addNameTitle: '',
				modalType: '',
				addNameBooleans: false,
				addCodingTitle: '',
				addCodingBooleans: false,
				addButtonShow: false, //添加-按钮是否有用
				modifyNameTitle: '',
				modifyCodingTitle: '',
				modifyNameBooleans: false,
				modifyCodingBooleans: false,
				modifyButtonShow: false,
				modifyShow: true, //修改-按钮是否有用
				addData: { //添加的数据
					"id": '',
					"name": '',
					"interface": '',
					"interfaceId": '',
					"coding": '',
					"remark": ''
				},
				modifyData: { //修改的数据
					"id": '',
					"name": '',
					"interface": '',
					"interfaceId": '',
					"coding": '',
					"remark": '',
					"index":''
				}
			}
		},

		mounted: function() {
			//双击表格调出模态框并且绑定数据的函数
			var that = this;
			function clickTable(_element,_event){
				$('.success').removeClass('success');
				$(_event).addClass('success');
				that.modifyData = {
					"id": _element.id,
					"name":_element.name,
					"interface": _element.interface,
					"interfaceId": _element.interfaceId,
					"coding": _element.coding,
					"remark": _element.remark,
					"index":_element.index
				}
			};
			function dblclickTable(_element,_event){
				$('.success').removeClass('success');
				$(_event).addClass('success');
				$('#myModalModify').modal('show');
				that.modifyData = {
					"id": _element.id,
					"name":_element.name,
					"interface": _element.interface,
					"interfaceId": _element.interfaceId,
					"coding": _element.coding,
					"remark": _element.remark,
					"index":_element.index
				}
			}
			$(".undfan-loading").fadeIn();
			this.$http.get('/dataCollect/STL/api/collectInterface').then( //获取通讯接口数据 
				function(res) {
					that.communicationList = res.body;
				},
				function(res) {
					toastr.warning('请求通讯接口文件时发生错误。', res.status + '错误', {
						closeButton: true,
						"showDuration": "300",
						"timeOut": "3000"
					});
				});
			this.$nextTick(function() {
				this.$http.get('/dataCollect/STL/api/collectUnit').then(
					function(data) {
						$(".undfan-loading").fadeOut();
						that.tableList = data.body;
						$(function() {
							//1.初始化Table
							var oTable = new TableInit();
							oTable.Init();
							//2.初始化Button的点击事件
							var oButtonInit = new ButtonInit();
							oButtonInit.Init();
						});
						var TableInit = function() {
							var oTableInit = new Object();
							//初始化Table
							oTableInit.Init = function() {

								$('#tb_departments').bootstrapTable({
									data: that.tableList, //获取数据s（*）
									toolbar: '#toolbar', //工具按钮用哪个容器
									striped: true, //是否显示行间隔色
									cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
									pagination: true, //是否显示分页（*）
									sortable: true, //是否启用排序
									sortOrder: "asc", //排序方式
									queryParams: oTableInit.queryParams, //传递参数（*）
									sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
									pageNumber: 1, //初始化加载第一页，默认第一页
									pageSize: 10, //每页的记录行数（*）
									pageList: [5, 25, 50, 100], //可供选择的每页的行数（*）
									strictSearch: true,
									showColumns: true, //是否显示所有的列
									showRefresh: false, //是否显示刷新按钮
									minimumCountColumns: 2, //最少允许的列数
									clickToSelect: false, //是否启用点击选中行
									uniqueId: "id", //每一行的唯一标识，一般为主键列
									showToggle:true,
									columns: [
									{
										field: 'name',
										title: '名称'
									},
									{
										field: 'interface',
										title: '通讯接口'
									},
									{
										field: 'coding',
										title: '编码'
									},
									{
										field: 'remark',
										title: '备注'
									}
									],
									onClickRow:function(_element,_event){
										_element.index = $('#tb_departments').find(_event[0]).data('index');
										//获取到单机的index
										clickTable(_element,_event);
									},
									onDblClickRow:function(_element,_event){
										_element.index = $('#tb_departments').find(_event[0]).data('index');
										//获取到双击的index
										dblclickTable(_element,_event);
									},
								});
							};
							// $("#tb_departments").attr('data-resizable','true');
							//得到查询的参数
							oTableInit.queryParams = function(params) {
								var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
									limit: params.limit, //页面大小
									offset: params.offset, //页码
									departmentname: $("#txt_search_departmentname").val(),
									statu: $("#txt_search_statu").val()
								};
								return temp;
							};
							return oTableInit;
						};

						var ButtonInit = function() {
							var oInit = new Object();
							var postdata = {};
							oInit.Init = function() {
								//初始化页面上面的按钮事件
							};
							return oInit;
						};
					},
					function(res) {
						$(".undfan-loading").fadeOut();
						toastr.warning('请求采集单元文件时发生错误。', res.status + '错误', {
							closeButton: true,
							"showDuration": "300",
							"timeOut ": "3000"
						});
					})
			});
		},
		beforeUpdate: function() {
			if(this.addNameBooleans == true || this.addCodingBooleans == true || this.addData.name == '' || this.addData.coding == '') {
				this.addButtonShow = true
			} else {
				this.addButtonShow = false
			};
			if(this.modifyNameBooleans == true || this.modifyCodingBooleans == true || this.modifyData.name == '' || this.modifyData.coding == '') {
				this.modifyButtonShow = true
			} else {
				this.modifyButtonShow = false
			}	
		},
		methods: {
			colResizable:function(){
				if(this.colResizableBooleans){
					$("#tb_departments").colResizable();
					console.log("xixixi")
					this.colResizableBooleans=false;
				}
			},
			initModal: function() { //模态框不进行添加操作  下次打开模态框清空上次数据
				this.addData = {
					"name": '',
					"coding": '',
					"remark": ''
				};
				this.addData.interface = this.communicationList[0].name;
			},
			add: function() { //点击添加模态框确认按钮执行
				$(".undfan-loading").fadeIn();
				var addSelect = document.getElementById("addSelect");
				var interfaceId = addSelect.options[addSelect.options.selectedIndex].getAttribute('data-id')
				console.log(interfaceId)
				this.$http.post('/dataCollect/STL/api/collectUnit', {
					"name": this.addData.name,
					"interfaceId":interfaceId,
					"coding": this.addData.coding,
					"remark": this.addData.remark
				})
				.then(function(res) {
					$(".undfan-loading").fadeOut();
					this.addData.id = res.body.id;
					if(!this.addData.id == "") {
						$('#tb_departments').bootstrapTable('append', this.addData);
					} else {
							//给过来的id是空
						}
					}, function(res) {
						$(".undfan-loading").fadeOut();
						toastr.warning('添加采集单元出现错误', '警告', {
							closeButton: true,
							"showDuration": "300",
							"timeOut": "3000"
						});
					});
				$('#myModalAdd').modal('hide'); //点击添加后隐藏模态框
			},
			show: function() { //点击表格上-修改-按钮执行
				// var selectedData = $('#tb_departments').bootstrapTable('getSelections'); //获取选中数据的数组
				console.log($('#tb_departments').find(".success"));
				if(!$('#tb_departments').find(".success").length==0) {
					$('#myModalModify').modal('show');
				} else {
					$('#myModalError').modal('show');
					this.modalMessage = '请选择一项采集单元进行修改操作'
				};
			},
			modify: function() { //点击修改模态框的确认按钮执行
				$(".undfan-loading").fadeIn();
				var that = this;
				var nowIndex = this.modifyData.index;
				// var selectedData = $('#tb_departments').bootstrapTable('getSelections');
				this.$http.put('/dataCollect/STL/api/collectUnit', {
					"id": this.modifyData.id,
					"name": this.modifyData.name,
					"interfaceId": this.modifyData.interfaceId,
					"coding": this.modifyData.coding,
					"remark": this.modifyData.remark
				}).then(function(res) {
					// if(selectedData.length==0)
					// {
					// 	//如果没有选择checkbox  nowIndex就是双击的index
					// 	nowIndex = that.modifyData.index;
					// }
					// else{
					// 	//通过checkbox选中
					// 	nowIndex = $('#tb_departments').bootstrapTable('getSelections')[0].index;
					// }
					$(".undfan-loading").fadeOut();
					$('#tb_departments').bootstrapTable('updateRow', {
						index: nowIndex,
						row: this.modifyData
					});
				}, function(res) {
					$(".undfan-loading").fadeOut();
					toastr.warning('修改文件时发生错误。', res.status + '错误', {
						closeButton: true,
						"showDuration": "300",
						"timeOut": "3000"
					});
				})
			},
			remove: function() { //点击表格上-删除-按钮执行
				$(".undfan-loading").fadeIn();
				var that = this;
				// var selectedData = $('#tb_departments').bootstrapTable('getSelections');
				// if(!selectedData.length == 0) {
					var idArray = [];
					// for(var i = 0; i < selectedData.length; i++) {
					// 	idArray.push(selectedData[i].id)
					// }
					idArray.push(this.modifyData.id);
					this.$http.delete('/dataCollect/STL/api/collectUnit', {
						body: idArray
					})
					.then(function(res) {
						$(".undfan-loading").fadeOut();
						$('#tb_departments').bootstrapTable('removeByUniqueId', that.modifyData.id);
					}, function(res) {
							// 出错
							var error = res.body.errCode;
							$(".undfan-loading").fadeOut();
							if(error == (-6)) {
								toastr.warning('该采集单元已被使用，无法删除。', '警告', {
									closeButton: true,
									"showDuration": "300",
									"timeOut": "3000"
								});
							} else {
								toastr.warning('删除文件时发生错误。', res.status + '错误', {
									closeButton: true,
									"showDuration": "300",
									"timeOut": "3000"
								});
							}
						})
				// } else {
				// 	$('#myModalError').modal('show');
				// 	this.modalMessage = '请选择一项或多项采集单元进行删除操作'
				// }
			},
			addNameKeyup: function() { //验证添加模态框里的名称
				var pattName = /^.{0,64}$/;
				if(!pattName.test(this.addData.name)) {
					this.addNameTitle = '名称不能超过64个字符';
					this.addNameBooleans = true;
					this.addNameStar = false;
				} else {
					this.addNameStar = true;
					this.addNameBooleans = false;
				}
			},
			addNameBlur: function() { //当添加模态框-名称input-取消焦点时验证是否有内容
				if(this.addData.name == '') {
					this.addNameTitle = '该项不能为空';
					this.addNameBooleans = true;
					this.addNameStar = false;
				}
			},
			addCodingKeyup: function() { //验证添加模态框里的编码是否
				var pattCoding = /^[A-Za-z0-9]{1,10}$/;
				if(!pattCoding.test(this.addData.coding)) {
					this.addCodingTitle = '请输入十位以内的数字或字母';
					this.addCodingBooleans = true;
					this.addCodingStar = false;
				} else {
					this.addCodingStar = true;
					this.addCodingBooleans = false;
				}
			},
			addCodingBlur: function() { //当添加模态框-编码input-取消焦点时验证是否有内容
				if(this.addData.coding == '') {
					this.addCodingTitle = '该项不能为空';
					this.addCodingStar = false;
					this.addCodingBooleans = true;
				}
			},
			modifyNameKeyup: function() { //验证添加模态框里的名称
				var pattName = /^.{0,64}$/;
				if(!pattName.test(this.modifyData.name)) {
					this.modifyNameTitle = '名称不能超过64个字符';
					this.modifyNameBooleans = true;
					this.modifyNameStar = false;
				} else {
					this.modifyNameStar = true;
					this.modifyNameBooleans = false;
				}
			},
			modifyNameBlur: function() { //当修改模态框-名称input-取消焦点时验证是否有内容
				if(this.modifyData.name == '') {
					this.modifyNameTitle = '该项不能为空';
					this.modifyNameBooleans = true;
					this.modifyNameStar = false;
				}
			},
			modifyCodingKeyup: function() { //验证添加模态框里的编码
				var pattCoding = /^[A-Za-z0-9]{1,10}$/;
				if(!pattCoding.test(this.modifyData.coding)) {
					this.modifyCodingTitle = '请输入十位以内的数字或字母';
					this.modifyCodingBooleans = true;
					this.modifyCodingStar = false;
				} else {
					this.modifyCodingStar = true;
					this.modifyCodingBooleans = false;
				}
			},
			modifyCodingBlur: function() { //当修改模态框-编码input-取消焦点时验证是否有内容
				if(this.modifyData.coding == '') {
					this.modifyCodingTitle = '该项不能为空';
					this.modifyCodingBooleans = true;
					this.modifyCodingStar = false;
				}
			}
		}
	}
</script>
<style scoped>
	.open {
		color: #333;
	}
	
	.modal-body {
		padding-left: 100px;
	}
	
	.table {
		table-layout: fixed;
	}
	@media screen and (max-width: 992px) {
		.modal-body {
			padding-left: 20px;
		}
	}
</style>