<template>
    <div class='home-container-head'>
        <ul>
            <template v-for="(item, $index) in menus">
                <li @click='selecMenu(item, $index)' :class="[item.type==type ? 'active' :'', $index == 2 ? 'last' :'']">{{item.name}}</li>
            </template>
        </ul>
        <div class='fomtip' @click.self='rest' v-show='isClick'>
            <div class="weui-cells weui-cells_checkbox">
                <label v-for="(item, index) in datas" v-on:change="checkData(item, $event)" class="weui-cell weui-check__label">

                    <div class="weui-cell__bd">
                        <p :class="[item.isOn ? 'off' :'']">{{item.name}}</p>
                    </div>
                    <div class="weui-cell__hd">
                        <template v-if='type==1'>
                            <input type="radio" class="weui-check" :value='item.name' v-model="arr_1">
                        </template>
                        <template v-if='type==2'>
                            <input type="checkbox" class="weui-check" :value='item.name' v-model="arr_2">
                        </template>
                        <template v-if='type==3'>
                            <input type="checkbox" class="weui-check" :value='item.name' v-model="arr_3">
                        </template>
                        <i class="weui-icon-checked"></i>
                    </div>

                </label>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/css/head-nav.scss'
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        data () {
            return {
                decline: false,
                checkedData: [],
                type: 1,
                arr_1: '推荐',
                arr_2: [],
                arr_3: [],
                isClick: false,
                datas: null,
                hadSelMenu: false
            }
        },
        props: {
            menus: {
                type: Array,
                required: true
            }
        },
        created () {
        },
        methods: {
            selecMenu(item, $index){
                let self = this
                if(self.type == item.type){
                    self.isClick = !self.isClick
                    self.type = item.type
                } else {
                    self.isClick = true
                    self.type = item.type
                }
                self.datas = item.datas
            },

            checkData(item, e) {
               let self = this
                let name = item.name
                let city = []
                let data = null
                if (this.type == 1) {
                    this.datas.filter(function($item, index){
                        if(item.name == $item.name) {
                            $item.isOn = true;
                        } else {
                            $item.isOn = false;
                        }
                        return $item
                    });
                    this.$emit('getCondition', item.name, this.type);
                } else if (this.type == 2) {
                    this.datas.filter(function($item, index){
                        if(item.name == $item.name) {
                            $item.isOn = !$item.isOn;
                        } 
                        return $item
                    });
                    this.$emit('getCondition', this.arr_2, this.type);
                } else {
                    this.arr_3=[]
                    this.datas.filter(function($item, index){
                        if(item.name == $item.name) {
                            if(!$item.isOn) {
                                self.arr_3.push(item.name);
                                self.$emit('getCondition', $item.type, self.type);
                            } else {
                                self.$emit('getCondition', '', self.type);
                            }
                            $item.isOn =  !$item.isOn ;
                            
                        } else {
                            $item.isOn = false;
                        }
                        return $item
                    });
                    
                }
                
            },
            rest() {
                this.isClick = !this.isClick;
            }


        }
    };
</script>

