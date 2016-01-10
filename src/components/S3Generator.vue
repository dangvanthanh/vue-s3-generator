<template>
	<div class="mdl-grid">
		<div class="mdl-cell mdl-cell--6-col">
			<div class="mdl-card mdl-shadow--2dp mdl-card--s3">
				<div class="mdl-card__title mdl-card--expand">
					<h2 class="mdl-card__title-text">Input</h2>
				</div>
				<div class="mdl-card__support-text">
					<div class="mdl-card__form">
						<div class="mdl-card__group">
							<div class="mdl-select mdl-js-select mdl-select--floating-label">
								<label for="" class="mdl-select_-label">Amazon Region:</label>
								<select v-model="s3Region" class="mdl-select__input">
									<option value="https://s3.amazonaws.com" selected>s3.amazonaws.com</option>
									<option value="https://s3-ap-southeast-2.amazonaws.com">s3-ap-southeast-2.amazonaws.com</option>
								</select>
							</div>
						</div>
						<div class="mdl-card__group">
							<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								<label for="" class="mdl-textfield__label">URL to access (i.e. bucket/file.txt)</label>
								<input type="text" v-model="s3Url | urlFormatter" class="mdl-textfield__input">
							</div>
						</div>
						<div class="mdl-card__group">
							<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								<label for="" class="mdl-textfield__label">AWS access key</label>
								<input type="text" v-model="s3AcessKey" class="mdl-textfield__input">
							</div>
						</div>
						<div class="mdl-card__group">
							<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								<label for="" class="mdl-textfield__label">AWS secret access key</label>
								<input type="text" v-model="s3SecretAccessKey" class="mdl-textfield__input">
							</div>
						</div>
					</div>
				</div>
				<div class="mdl-card__actions mdl-card--border">
					<button @click="getLinkS3Generator" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Get Link</button>&nbsp;
					<button @click="resetLinkS3Generator" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Reset</button>
				</div>
			</div>
		</div>
		<div class="mdl-cell mdl-cell--6-col">
			<div class="mdl-card mdl-shadow--2dp mdl-card--s3">
				<div class="mdl-card__title">
					<h2 class="mdl-card__title-text">Output</h2>
				</div>
				<div class="mdl-card__support-text">
					<div class="mdl-card__group">{{ s3ExpiresAt }}</div>
					<div class="mdl-card__group">{{ s3Canonical }}</div>
					<div class="mdl-card__group">{{ s3Signature }}</div>
					<div class="mdl-card__group">{{{ s3SignedUrl }}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import * as s3 from '../helpers/siggenerator';

	export default {
		data() {
			return {
				s3Region: '',
				s3Url: '',
				s3AcessKey: '',
				s3SecretAccessKey: '',
				s3ExpiresAt: '',
				s3Canonical: '',
				s3Signature: '',
				s3SignedUrl: ''
			}
		},

		filters: {
			urlFormatter: {
				read(url) {
					if (url === '/') {
						url = '';
					}

					return url;
				},
				write(url, oldUrl) {

					if (url.charAt(0) !== '/') {
						url = '/' + url;
					}

					return url;
				}
			}
		},

		methods: {
			getLinkS3Generator() {
				var self = this;
				var now = new Date().getTime() / 1000;
				var expiresAt = Math.floor(now + parseInt(3600, 10));
				var canonicalString = s3.generateCanonicalString(self.s3Url, expiresAt, self.s3SecretAccessKey);
				var signature = s3.generateSignature(self.s3Url, expiresAt, self.s3SecretAccessKey);
				var signedUrl = s3.generateSignedUrl(self.s3Region, self.s3Url, expiresAt, self.s3AcessKey, signature);

				self.$set('s3ExpiresAt', 'Expires at: ' + expiresAt);
				self.$set('s3Canonical', 'Canonical string: ' + canonicalString);
				self.$set('s3Signature', 'Signature: ' + signature);
				self.$set('s3SignedUrl', '<a class="mdl-button mdl-js-button mdl-button--raised" href="' + signedUrl + '" download="' + signedUrl + '"><i class="material-icons">get_app</i><span>Download</span></a>');
			},

			resetLinkS3Generator() {
				var self = this;

				self.$set('s3Region', '');
				self.$set('s3Url', '');
				self.$set('s3Expires', '');
				self.$set('s3AcessKey', '');
				self.$set('s3SecretAccessKey', '');
			}
		}
	}
</script>

<style>
	.mdl-card--s3,
	.mdl-card--s3 .mdl-textfield {
		width: 100%;
	}

	.mdl-card--s3 .mdl-card__support-text {
		padding: 15px;
	}

	.mdl-card--s3 .mdl-card__title {
		background: #3f51b5;
	}

	.mdl-card--s3 .mdl-card__title-text {
		color: #fff;
	}

	.mdl-card__form {
		margin-top: 20px;
	}

	.mdl-card__group {
		margin-bottom: 15px;
	}
</style>
