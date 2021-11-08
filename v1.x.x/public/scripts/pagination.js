const paginate = document.getElementById('paginate');
const $articlesContainer = $('#articles-container');

paginate.addEventListener('click', function(e) {
	e.preventDefault();
	fetch(this.href)
		.then(response => response.json())
		.then(data => {
			for(const article of data.docs) {
				let template = generateArticle(article);
				$articlesContainer.append(template);
			}
			let { nextPage } = data;
			this.href = this.href.replace(/page=\d+/, `page=${nextPage}`);
		})
		.catch(err => console.log(err));
})

function generateArticle(article) {
	let template = `<div class="col-md-6 col-lg-4 col-xl-3">
						<div class="card mb-3 bgFra">
							<img class="img-fluid" alt="" src="${ article.images[0].url }">
							<div class="card-body">
								<h5 class="card-title mdText contentFont">${ article.titre }</h5>
								<p class="card-text smText contentFont">${ article.contenu.substring(0, 300) }...</p>
								<a class="ccBtn mdBtn" href="/articles/${ article._id }">Lire la suite</a>
							</div>
						</div>
					</div>`;
					return template;
}