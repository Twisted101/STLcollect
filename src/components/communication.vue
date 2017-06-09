<!-- 通讯接口模块 -->
<template>
	<div class="communication">
		<div class="add-button">
			<span>通讯接口列表</span>
			<button data-toggle="modal" data-target="#myModalAdd" class="btn btn-primary" v-on:click="initModal">添加接口</button>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-6 col-lg-4" v-for="(litm,index) in communicationList">
				<div class="undfan-ibox">
					<div class="undfan-ibox-title">
						<div class="undfan-ibox-icon">
							<span class="icon-name">{{litm.name}}</span>
						</div>
						<div class="undfan-ibox-tools">
							<span class="glyphicon glyphicon-pencil undfan-ibox-edit" title="编辑" data-toggle="modal" data-target="#myModalModify" v-on:click='show(index)' v-bind:index='index'></span>&nbsp;&nbsp;
							<span class="glyphicon glyphicon-trash undfan-ibox-trash" title="删除" data-toggle="modal" data-target="#confirmDelete" v-bind:index='index' v-on:click="recordIndex(index)"></span>
						</div>
					</div>
					<div class="undfan-ibox-content">
						<p>
							<div class="row" style="min-height: 30px;">
								<span class="col-xs-4 control-label module-text" style="text-align:right ;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">通讯端口:</span>
								<span class="col-xs-7 control-label module-text" style="text-align:left ;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{litm.port}}</span>
							</div>
							<div class="row" style="min-height: 30px;">
								<span class="col-xs-4 control-label module-text" style="text-align:right ;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">备注:</span>
								<span class="col-xs-7 control-label module-text" style="text-align:left ;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{litm.remark}}</span>
							</div>
						</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 添加的弹出框 -->
		<div class="modal fade bs-example-modal-sm" id="myModalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<div>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								<span class="white">&times;</span>
							</button>
							<label>添加通讯接口</label>
						</div>
					</div>
					<div class="modal-body">
						<div class="row" style="line-height: 30px;">
							<label class="control-label col-xs-12 col-md-2 align-left">名称:</label>
							<input type="text" style="height: 30px;" class="col-xs-offset-1 col-xs-9 col-md-offset-0 col-md-7" placeholder="请输入名称" v-model="addData.name" v-on:keyup="addNameKeyup" v-on:blur="addNameBlur" />
							<div class="col-xs-2">
								<a href="#" tabindex="-1" title="该项不能为空!" v-show='addNameStar'>
									<span>*</span>
								</a>
								<a href="#" tabindex="-1" v-bind:title="addNameTitle" v-show='addNameBooleans'>
									<i class="glyphicon glyphicon-warning-sign" style="color: red;"></i>
								</a>
							</div>
						</div>
						<div class="row" style="line-height: 30px;">
							<label class="control-label col-xs-12 col-md-2 align-left">端口:</label>
							<input type="text" style="height: 30px;" class="col-xs-offset-1 col-xs-9 col-md-offset-0 col-md-7" placeholder="请输入端口号" v-model="addData.port" v-on:keyup="addPortKeyup" v-on:blur="addPortBlur" />
							<div class="col-xs-2">
								<a href="#" tabindex="-1" title="该项不能为空!" v-show='addPortStar'>
									<span>*</span>
								</a>
								<a href="#" tabindex="-1" v-bind:title='addPortTitle' v-show='addPortBooleans'>
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
		<!-- /添加的弹出框 -->
		<!-- 修改的弹出框 -->
		<div class="modal fade bs-example-modal-sm" id="myModalModify" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<div>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								<span class="white">&times;</span>
							</button>
							<label>修改通讯接口</label>
						</div>
					</div>
					<div class="modal-body">
						<div class="row" style="line-height: 30px;">
							<label class="control-label col-xs-12 col-md-2 align-left">名称:</label>
							<input type="text" style="height: 30px;" class="col-xs-offset-1 col-xs-9 col-md-offset-0 col-md-7" placeholder="请输入名称" v-model="modifyData.name" v-on:keyup="modifyNameKeyup" v-on:blur="modifyNameBlur" />
							<div class="col-xs-2">
								<a href="#" tabindex="-1" title="该项不能为空!" v-show='modifyNameStar'>
									<span>*</span>
								</a>
								<a href="#" tabindex="-1" v-bind:title="modifyNameTitle" v-show='modifyNameBooleans'>
									<i class="glyphicon glyphicon-warning-sign" style="color: red;"></i>
								</a>
							</div>
						</div>
						<div class="row" style="line-height: 30px;">
							<label class="control-label col-xs-12 col-md-2 align-left">端口:</label>
							<input type="text" style="height: 30px;" class="col-xs-offset-1 col-xs-9 col-md-offset-0 col-md-7" placeholder="请输入端口号" v-model="modifyData.port" v-on:keyup="modifyPortKeyup" v-on:blur="modifyPortBlur" />
							<div class="col-xs-2">
								<a href="#" tabindex="-1" title="该项不能为空!" v-show='modifyPortStar'>
									<span>*</span>
								</a>
								<a href="#" tabindex="-1" v-bind:title='modifyPortTitle' v-show='modifyPortBooleans'>
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
						<button class="btn btn-sm btn-success" data-dismiss="modal" v-on:click="modify" v-bind:disabled='modifyButtonShow'>确定</button>
					</div>
				</div>
			</div>
		</div>
		<!-- /修改的弹出框 -->
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
						<h5>确定要删除 <span style="color:red">{{deleteName}}</span> 通讯接口吗？</h5>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-sm btn-success" data-dismiss="modal" v-on:click='remove(index)'>确定</button>
					</div>
				</div>
			</div>
		</div>
		<!-- /提示是否删除的模态框 -->
	</div>
</template>
<script type="text/javascript">
	export default {
		mounted: function() { //AJAX获取到数据数组
			$(".undfan-loading").fadeIn();
			var that = this;
			this.$http.get('/dataCollect/STL/api/collectInterface').then(
				function(res) {
					$(".undfan-loading").fadeOut();
					that.communicationList = res.body;
				},
				function(res) {
					$(".undfan-loading").fadeOut();
					toastr.warning('请求通讯接口文件时发生错误。', res.status + '错误', {
						closeButton: true,
						"showDuration": "300",
						"timeOut": "3000"
					});
				});
		},
		beforeUpdate: function() {
			if(this.addNameBooleans == true || this.addPortBooleans == true || this.addData.name == '' || this.addData.port == '') {
				this.addButtonShow = true
			} else {
				this.addButtonShow = false
			};
			if(this.modifyNameBooleans == true || this.modifyPortBooleans == true || this.modifyData.name == '' || this.modifyData.port == '') {
				this.modifyButtonShow = true
			} else {
				this.modifyButtonShow = false
			};
		},
		data: function() {
			return {
				deleteIndex: 0,
				communicationList: [], //数据数组
				nowIndex: 0, //当前修改的数据的索引值
				addNameStar:true,//添加模态框名称的星星
				addPortStar:true,//添加端口星星
				modifyNameStar:true,
				modifyPortStar:true,
				addNameTitle: '', //添加-名称-警示三角的标题
				addPortTitle: '', //添加-端口-警示三角的标题
				addNameBooleans: false, //添加-名称-警示三角是否显示
				addPortBooleans: false, //添加-端口-警示三角是否显示
				addButtonShow: false, //添加-按钮是否有用
				modifyNameTitle: '', //修改-名称-警示三角的标题
				modifyPortTitle: '', //修改-端口-警示三角的标题
				modifyNameBooleans: false, //修改-名称-警示三角是否显示
				modifyPortBooleans: false, //修改-端口-警示三角是否显示
				modifyButtonShow: false, //修改-按钮是否有用
				deleteName: '',
				addData: { //添加的数据
					"id": '',
					"name": '',
					"port": '',
					"remark": ''
				},
				modifyData: { //修改的数据
					"name": '',
					"port": '',
					"remark": ''
				}
			}
		},
		methods: {
			// moni:function(){

			// },
			initModal: function() { //模态框不进行添加操作  下次打开模态框清空上次数据
				this.addData = {
					"name": '',
					"port": '',
					"remark": ''
				};
			},
			add: function() { //点击添加 添加到数组
				$(".undfan-loading").fadeIn();
				var that = this;
				this.$http.post('/dataCollect/STL/api/collectInterface', {
					"name": this.addData.name,
					"port": this.addData.port,
					"remark": this.addData.remark
				})
				.then(function(res) {
					$(".undfan-loading").fadeOut();
					this.addData.id = res.body.id;
					if(!this.addData.id == "") {
						this.communicationList.push(this.addData);
					} else {
							//给过来的id是空
						}
					}, function(res) {
						$(".undfan-loading").fadeOut();
						toastr.warning('添加文件时发生错误。', res.status + '错误', {
							closeButton: true,
							"showDuration": "300",
							"timeOut": "3000"
						})
					});
				$('#myModalAdd').modal('hide'); //点击添加后关闭模态框
			},
			recordIndex: function(index) { //点击删除 获得当前的index 确认删除时使用
				this.deleteIndex = index;
				this.deleteName = this.communicationList[this.deleteIndex].name;
			},
			remove: function() { //点击模态框确认删除按钮 从数组里删除指定数据
				$(".undfan-loading").fadeIn();
				var that = this;
				var idArray = [];
				idArray.push(this.communicationList[this.deleteIndex].id);
				this.$http.delete('/dataCollect/STL/api/collectInterface', {
					body: idArray
				})
				.then(function(res) {
						//成功
						$(".undfan-loading").fadeOut();
						this.communicationList.splice(this.deleteIndex, 1); //删除前端的数据
					}, function(res) {
						$(".undfan-loading").fadeOut();
						var error = res.body.errCode;
						if(error == (-6)) {
							toastr.warning('该通讯接口已被使用，无法删除。', '警告', {
								closeButton: true,
								"showDuration": "300",
								"timeOut": "3000"
							});
						} else {
							toastr.warning('删除文件时发生错误。', res.status + '错误', {
								closeButton: true,
								"showDuration": "300",
								"timeOut": "3000"
							})
						}
					})
			},
			show: function(index) { //点击修改 在模态框里绑定数值
				this.nowIndex = index;
				this.modifyData = {
					"id": this.communicationList[index].id,
					"name": this.communicationList[index].name,
					"port": this.communicationList[index].port,
					"remark": this.communicationList[index].remark
				};
				this.modifyNameBooleans = false;
				this.modifyPortBooleans = false;
			},
			modify: function() { //点击模态框的修改 修改数组数据
				$(".undfan-loading").fadeIn();
				this.$http.put('/dataCollect/STL/api/collectInterface', {
					"id": this.modifyData.id,
					"name": this.modifyData.name,
					"port": this.modifyData.port,
					"remark": this.modifyData.remark
				}).then(function(res) {
					//成功
					$(".undfan-loading").fadeOut();
					this.communicationList.splice(this.nowIndex, 1, this.modifyData); //修改前端的数据
				}, function(res) {
					$(".undfan-loading").fadeOut();
					toastr.warning('修改文件时发生错误。', res.status + '错误', {
						closeButton: true,
						"showDuration": "300",
						"timeOut": "3000"
					})
				})
			},

			addNameKeyup: function() { //添加的模态框里验证-名称-的输入是否合法
				var pattName = /^.{0,64}$/;
				if(!pattName.test(this.addData.name)) {
					this.addNameTitle = '接口名称不能超过64个字符';
					this.addNameBooleans = true;
					this.addNameStar = false;
				} else {
					this.addNameBooleans = false;
					this.addNameStar = true;
				}
			},
			addNameBlur: function() { //添加的模态框里验证-名称-的输入是否为空
				if(this.addData.name == '') {
					this.addNameTitle = '该项不能为空';
					this.addNameBooleans = true;
					this.addNameStar = false;
				}
			},
			addPortKeyup: function() { //添加的模态框里验证-端口-的输入是否合法
				var pattPort = /^\d{0,5}$/;
				if(!pattPort.test(this.addData.port)) {
					this.addPortTitle = '请输入五位以内的数字';
					this.addPortBooleans = true;
					this.addPortStar = false;
				} else {
					this.addPortBooleans = false;
					this.addPortStar = true;
				}
			},
			addPortBlur: function() { //添加的模态框里验证-端口-的输入是否为空
				if(this.addData.port == '') {
					this.addPortTitle = '该项不能为空';
					this.addPortBooleans = true;
					this.addPortStar = false;
				}
			},
			modifyNameKeyup: function() { //修改的模态框里验证-名称-的输入是否合法
				var pattName = /^.{0,64}$/;
				if(!pattName.test(this.modifyData.name)) {
					this.modifyNameTitle = '接口名称不能超过64个字符';
					this.modifyNameBooleans = true;
					this.modifyNameStar = false;
				} else {
					this.modifyNameStar = true;
					this.modifyNameBooleans = false;
				}
			},
			modifyNameBlur: function() { //修改的模态框里验证-名称-的输入是否为空
				if(this.modifyData.name == '') {
					this.modifyNameTitle = '该项不能为空';
					this.modifyNameStar = false;
					this.modifyNameBooleans = true;
				}
			},
			modifyPortKeyup: function() { //修改的模态框里验证-端口-的输入是否合法
				var pattPort = /^\d{0,5}$/;
				if(!pattPort.test(this.modifyData.port)) {
					this.modifyPortTitle = '请输入五位以内的数字';
					this.modifyPortBooleans = true;
					this.modifyPortStar = false;
				} else {
					this.modifyPortBooleans = false;
					this.modifyPortStar = true;
				}
			},
			modifyPortBlur: function() { //修改的模态框里验证-端口-的输入是否为空
				if(this.modifyData.port == '') {
					this.modifyPortTitle = '该项不能为空';
					this.modifyPortBooleans = true;
					this.modifyPortStar = false;
				}
			}
		}
	}
</script>
<style scoped>
	.modal-body {
		padding-left: 100px;
	}
	
	.add-button {
		margin-bottom: 16px;
		padding-bottom: 8px;
	}
	
	.add-button>span {
		font-size: 20px;
		vertical-align: middle;
	}
	
	.add-button>button {
		margin-left: 10px;
		width: 120px;
	}
	
	.undfan-ibox {
		clear: both;
		margin-bottom: 25px;
		margin-top: 0;
		padding: 0;
		background-color: #f1f1f1;
	}
	
	.undfan-ibox-title {
		-moz-border-bottom-colors: none;
		-moz-border-left-colors: none;
		-moz-border-right-colors: none;
		-moz-border-top-colors: none;
		border-image: none;
		border-color: #f1f1f1;
		border-style: solid solid none;
		border-width: 2px 0 0;
		color: inherit;
		margin-bottom: 0;
		padding: 15px 15px 7px;
		min-height: 48px;
	}
	
	.undfan-ibox-content {
		color: inherit;
		padding: 15px 20px 20px;
		font-size: 16px;
		border-color: #28B779;
		border-image: none;
		border-style: solid solid none;
		border-width: 1px 0;
	}
	
	.undfan-ibox-content-min-height-176 {
		min-height: 176px;
	}
	
	.undfan-ibox-footer {
		color: inherit;
		border-top: 1px solid #e9e9e9;
		font-size: 90%;
		background: #ffffff;
		padding: 10px 15px;
	}
	
	.undfan-ibox-tools {
		display: block;
		float: none;
		margin-top: 0;
		position: relative;
		padding: 0;
		text-align: right;
	}
	
	.undfan-ibox-into {
		color: #006DB1;
		cursor: pointer;
	}
	
	.undfan-ibox-edit {
		color: #28B779;
		cursor: pointer;
	}
	
	.undfan-ibox-trash {
		color: #D9534F;
		cursor: pointer;
	}
	
	a {
		cursor: pointer;
		margin-left: 5px;
		color: #c4c4c4;
	}
	
	.undfan-ibox-title .undfan-ibox-icon {
		display: inline-block;
		max-width: 80%;
		font-size: 16px;
		margin: 0 0 7px;
		padding: 0;
		float: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.icon-virtualnode {
		color: #0f0;
	}
	
	.icon-name {
		margin-left: 5px;
	}
	@media screen and (max-width: 992px) {
		.modal-body {
			padding-left: 20px;
		}
	}
</style>