<template>
    <section>
        <div class="pro-schedule">
            <ul>
                <li v-for="item in data.project_detail.records">
                    <time><span>{{item.updateTime | moment('DD')}}</span>{{item.updateTime | moment('MM')}}月</time>
                    <div>
                        <p>{{item.title}}</p>
                        <small>{{item.content}}</small>
                        <img v-for="im in item.image.split(',')" :src="im" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import api from '../../api/api'
    import '../../assets/css/investors/Project.scss'
    export default {
        data () {
            return {
                data: {
                    project_detail: {
                        records: []
                    }
                }
            }
        },
        created () {
            let This = this;
            let projectId = {projectId: This.$route.params.id};
            api.invest_project_info(projectId, function (data) {
                This.data = data.data;
            });
        },
        components: {},
        watch: {},
        computed: {},
        methods: {}
    };
</script>


