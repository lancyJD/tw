<template>
    <section class="pse">
        <h1>项目自评（0-10分）</h1>
        <ul>
            <li>
                <p>1、刚性需求，用户粘性与复购率<br>（产品能解决用户痛点，创造商业价值）</p>
                <input type="number" :value="$route.params.common1" readonly/>
            </li>
            <li>
                <p>2、未来变现、造血和盈利能力<br>（项目有较清晰收费模式和盈利模式）</p>
                <input type="number" :value="$route.params.common2" readonly/>
            </li>
            <li>
                <p>3、模式成熟、自我复制和扩张能力<br>（业务模式清晰，能从0到1，从1到N复制和扩张）</p>
                <input type="number" :value="$route.params.common3" readonly/>
            </li>
            <li>
                <p>4、CEO领袖气质+团队完整性+股权分配<br>（领袖、团队、股权、激励的综合考评）</p>
                <input type="number" :value="$route.params.common4" readonly/>
            </li>
            <li>
                <p>5、运营数据可靠和成熟<br>（泛指产品阶段性的运营数据）</p>
                <input type="number" :value="$route.params.common5" readonly/>
            </li>
            <li>
                <p>6、估值合理，性价比高<br>（合理的预算，融资需求，开价和估值）</p>
                <input type="number" :value="$route.params.common6" readonly/>
            </li>
        </ul>
    </section>
</template>

<script>
    import '../../assets/css/investors/Project.scss'
    export default {
        data () {
            return {}
        },
        created () {
        },
        components: {},
        watch: {},
        computed: {},
        methods: {}
    };
</script>


