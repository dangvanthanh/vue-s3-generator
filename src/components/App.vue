<template>
	<div class="mdl-layout">
		<header class="mdl-layout__header">
			<div class="mdl-layout__header-row">
				 <span class="mdl-layout-title">Linkit</span>
			</div>
		</header>
		<main class="mdl-layout__content">
			<div class="mdl-layout__content-row">
				<div class="mdl-grid">
					<div class="mdl-cell mdl-cell--12-col">
						<h2>Linkit Tools - S3 Signature Generator</h2>
						<p>This is a tool to help you generate one-off signed Amazon S3 urls. For more information about the S3 Signature protocol see <a href="http://s3.amazonaws.com/doc/s3-developer-guide/RESTAuthentication.html" target="_blank">Amazon's Developer Guide</a>. This is useful if you want to store files in a private S3 bucket but still allow access to individuals without having to provide credentials or alter access control lists.</p>
					</div>
				</div>
				<s3-generator></s3-generator>
			</div>
		</main>
	</div>
</template>

<script>
	import S3Generator from './S3Generator.vue';

	export default {
		components: {
			S3Generator
		}
	}
</script>
