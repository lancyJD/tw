<template>
	<div class='BP-detail'>
		<section>
			<div class='project-pdf'>
				<p class='name'>BP资料</p>
				<p class='pdfname'>XXX.pdf</p>
			</div>
			<div class='project-pdf'>
				<p class='name'>BP资料</p>
				<p class='pdfname'>XXX.pdf</p>
			</div>
		</section>
	</div>
</template>

<script>
export default {
  data () {
    return {
    	
    };
  },
  methods: {
  	divbianc() {
		
	}
  }
    
};
</script>

<style lang='scss' scoped>
@import '../../assets/css/bass.scss';
.BP-detail{
  	width: 100%;

	.project-pdf{
		margin: 0 auto;
		width: 95%;
		background-color: #fff;
		height: 1rem;
		font-size:18px;
		color:#868686;
		letter-spacing:0px;
		text-align:left;
		border-radius: .12rem;
		margin-top: .22rem;
		p{

			height: 1rem;
			line-height: 1rem;
			float: left;
			/*width: 50%;*/
		}
		p.name{
			margin-left:.3rem;
			width:30%;
		}
		p.pdfname{
			text-align: right;
			width: 60%;
		}
	}
}
</style>
