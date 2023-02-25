window.mvc ? null : (window.mvc = {});

window.mvc.m ? null : (window.mvc.m = model = {
    error: {
        image: e=>{
            console.log('model.error.image', e);
            e.remove();
        }
    }
});

window.mvc.v ? null : (window.mvc.v = view = function(route) {
    return new Promise(async function(resolve, reject) {
        var page = route.page;
        var path = route.path;
        var gut = route.hash ? rout.ed.dir(route.hash.split('#')[1]) : [];
        var get = (route ? route.GOT : rout.ed.dir(dom.body.dataset.path)).concat(gut);
        var root = get[0] || gut[0];

        window.GET = window.GET ? GET : rout.ed.dir(dom.body.dataset.path);

        $(dom.body.all('aside')).remove();

        console.log({
            page
        });

        var page = route.page;
        var vp = dom.body.find('[data-page="' + page + '"]');

        0 > 1 ? null : console.log(108, {
            route,
            vp
        });

        var feeds = vp.all('[data-media]');
        if (feeds.length > 0) {
            var f = 0;
            do {
                var feed = feeds[f];
                var limit = feed.children.length;
                var media = feed.dataset.media;

                if (media === "merch") {
                    //var json = await ajax('raw/posts/posts.json')
                    var posts = [];
                    if (is.iframe) {
                        var user = await github.user.get();
                        posts = await github.repos.contents({
                            owner: user.login,
                            path: '/raw/posts/posts.json',
                            repo: window.parent.GET[1]
                        }, {
                            accept: "application/vnd.github.raw"
                        });
                    } else {
                        posts = JSON.parse(await ajax('raw/merch/merch.json'));
                    }

                    var ancestors = posts.filter(row=>rout.ed.dir(row.slug).length === 1);

                    if (ancestors.length > 0) {

                        var p = 0;
                        var html = "";

                        do {

                            var post = ancestors[p];

                            var elem = 0 < 1 ? feed.children[p] : feed.nextElementSibling.content.firstElementChild.cloneNode(true);

                            if (post) {

                                var descendants = posts.filter(function(row) {
                                    var dir = rout.ed.dir(row.slug);
                                    return dir.length > 1 && dir[0] === post.slug
                                });

                                console.log(57, {
                                    post,
                                    descendants,
                                    posts
                                });

                                elem.dataset.display = "flex";
                                elem.dataset.href = "/shop/merch/" + post.slug;

                                var image = elem.find('picture img');
                                image && post.images ? image.src = post.images[0] : null;

                                var date = elem.find('[placeholder="Date"]');
                                date && post.date ? date.textContent = post.date : null;

                                var title = elem.find('[placeholder="Title"]');
                                title && post.title ? title.textContent = post.title : null

                                var description = elem.find('[placeholder="Description"]');
                                description && post.description ? description.textContent = post.description : null;

                                var pricing = elem.find('[placeholder="$0.00"]');
                                if (pricing && post.pricing) {}

                                //html += elem.outerHTML;
                            } else {

                                elem.dataset.display = "none";

                            }

                            p++;

                        } while (p < limit);

                        //feed.innerHTML = html;

                    }

                    console.log(115, {
                        feed,
                        media,
                        posts
                    });
                }

                if (media === "pages") {
                    //var json = await ajax('raw/posts/posts.json')
                    var posts = [];
                    if (is.iframe) {
                        var user = await github.user.get();
                        posts = await github.repos.contents({
                            owner: user.login,
                            path: '/raw/posts/posts.json',
                            repo: window.parent.GET[1]
                        }, {
                            accept: "application/vnd.github.raw"
                        });
                    } else {
                        posts = JSON.parse(await ajax('raw/posts/posts.json'));
                    }

                    if (posts.length > 0) {

                        var p = 0;
                        var html = "";

                        do {

                            var post = posts[p];
                            var elem = 0 < 1 ? feed.children[p] : feed.nextElementSibling.content.firstElementChild.cloneNode(true);

                            var date = elem.find('[placeholder="Date"]');
                            var title = elem.find('[placeholder="Title"]');
                            var description = elem.find('[placeholder="Description"]');
                            var picture = elem.find('picture');

                            console.log(57, {
                                title,
                                post
                            });

                            date ? date.textContent = post.date ? date.textContent = post.date : date.remove() : null;
                            title.textContent = post.title;
                            description.textContent = post.description;
                            post.image ? picture.find('img').dataset.src = post.image : null;

                            //html += elem.outerHTML;

                            p++;

                        } while (p < limit);

                        //feed.innerHTML = html;

                    }

                    console.log(37, {
                        feed,
                        media,
                        posts
                    });
                }
                f++;
            } while (f < feeds.length)
        }

        resolve(route);
    }
    );
}
);

window.mvc.c ? null : (window.mvc.c = controller = {});
