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

        var json = await ajax('/site.webmanifest');
        window.webmanifest = JSON.parse(json);
        console.log(webmanifest);
        dom.body.find('[data-value="webmanifest.name"]').textContent = webmanifest.name;

        $(dom.body.all('aside')).remove();

        var page = route.page;
        var vp = dom.body.find('[data-page="' + page + '"]');

        0 > 1 ? console.log(108, {
            route,
            vp
        }) : null;

        //MEDIA FEED
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

        //MERCH PRODUCT
        var merch = vp.find('[data-merch]');
        if (merch) {
            var got = route.GOT;
            var slug = got.splice(merch.dataset.merch, got.length - 1).join('/');
            var parent = rout.ed.dir(slug)[0];
            console.log(190, parent, slug);

            ajax("/raw/merch/" + parent + "/merch.json").then(function(d) {
                var data = JSON.parse(d);
                var ancestor = data.filter(row=>rout.ed.dir(row.slug).length === 1)[0];

                //DIMENSIONS
                var box = merch.find('[data-value="post.traits"]').closest('box');
                var n = 0;
                var attr = [];
                var variant = false;
                var dimensions = ancestor && ancestor.dimensions;
                if (dimensions && dimensions.length > 0) {
                    var template = box.lastElementChild;

                    template.previousElementSibling.innerHTML = "";
                    box.removeAttribute('data-display');

                    var d = 0;
                    do {
                        var el = template.content.firstElementChild.cloneNode(true);
                        var dimension = dimensions[d];

                        var name = dimensions[d].name;
                        var field = el.find('field');
                        field.find('text').dataset.name = field.find('text').textContent = dimension.name;

                        var dropdown = el.find('dropdown');
                        var values = dimensions[d].values;
                        if (values.length > 0) {
                            var aa = 0;
                            var v = 0;
                            0 > 1 ? console.log(399, {
                                values
                            }) : null;
                            do {
                                var item = dropdown.find('template').content.firstElementChild.cloneNode(true);
                                item.find('span').dataset.after = values[v];
                                dropdown.children[1].insertAdjacentHTML('beforeend', item.outerHTML);
                                v++;
                            } while (v < values.length);

                            if (rout.ed.dir(slug).length > 1) {
                                var u = rout.ed.dir(route.path);
                                var gat = u.splice(5, u.length - 1);
                                var matrix = get[get.length - 1];
                                var arr = 0 < 1 ? matrix.split('_') : gat;
                                var ax = 0;
                                do {
                                    var ar = arr[ax];
                                    if (0 < 1 && ar) {
                                        var dd = 0;
                                        do {
                                            var vv = 0;
                                            do {
                                                if (ar) {
                                                    var value = dimensions[dd].values[vv];
                                                    var name = dimensions[dd].name;
                                                    if (value) {
                                                        var vars = {
                                                            arr1: ar.split('-')[0].toLowerCase(),
                                                            arr2: ar.split(ar.split('-')[0] + "-")[1].replace('-', ' ').toLowerCase(),
                                                            name: name.toLowerCase(),
                                                            value: value.toLowerCase().replace('-', ''),
                                                            element: el.find('[placeholder][data-name="' + name + '"]')
                                                        }
                                                        //console.log(367, vars);
                                                        if (vars.element && vars.arr1 === vars.name && vars.arr2 === vars.value) {
                                                            vars.element.closest('field').nextElementSibling.find('[placeholder]').textContent = value;
                                                        }
                                                    }
                                                    aa++;
                                                }
                                                vv++;
                                            } while (vv < values.length);
                                            dd++;
                                        } while (dd < dimensions.length);
                                    }
                                    ax++;
                                } while (ax < arr.length);
                            }

                            //Find Variation
                            if (n === dimensions.length) {
                                var variant = true;
                            }
                        }

                        template.previousElementSibling.insertAdjacentHTML('beforeend', el.outerHTML);

                        var name = el.find('field [placeholder]').dataset.name;
                        var value = el.find('dropdown [placeholder]').textContent;
                        //console.log(template, name, value);
                        if (name && value) {
                            attr.push(name.toLowerCase().replaceAll('-', '') + "-" + value.toLowerCase().replaceAll('-', ''));
                        }
                        d++;
                    } while (d < dimensions.length);
                } else {
                    box.dataset.display = "none";
                }

                var descendants = data.filter(function(row) {
                    var dir = rout.ed.dir(row.slug);
                    return dir.length > 1 && dir[0] === ancestor.slug;
                });

                var product = null;
                if (rout.ed.dir(slug).length === 1) {
                    product = ancestor;
                } else {
                    product = descendants.find(o => o.slug === slug);
                    product = product ? product : ancestor;
                    console.log();
                }

                var prices = [];
                descendants.forEach(function(row) {
                    var price = row.pricing ? price = row.pricing : null;
                    price ? prices.push(price) : null;
                });

                console.log({
                    data,
                    slug,
                    ancestor,
                    descendants,
                    product,
                    prices
                });

                var image = merch.find('[data-value="post.image"]');
                product.images && product.images.length > 0 ? image.src = product.images[0] : null;

                var title = $(merch.all('[placeholder="Title"]'));
                product.title ? title.html(product.title) : null;

                var title = $(merch.all('[data-value="post.href"]'));
                product.title ? title.attr('data-href', route.page.replace('*', ancestor.slug)) : null;

                if (prices.length > 0) {
                    prices.sort((a,b)=>a.ListPrice - b.ListPrice);
                    var pricing = $(merch.all('[data-value="post.pricing"]'));
                    pricing ? pricing.html("$" + prices[0].ListPrice + " &#8211; " + "$" + prices[prices.length - 1].ListPrice) : null;
                    console.log(pricing);
                }

                var description = merch.find('[data-value="post.description"]');
                if (product.description) {
                    description.textContent = product.description;
                } else {
                    description.closest('box').dataset.display = "none";
                }

                var details = merch.find('[data-value="post.details"]');
                if (product.details) {
                    details.html(product.details)
                } else {
                    details.closest('box').dataset.display = "none";
                }

            })
        }

        //CART
        var vp = dom.body.find('[data-view="cart"]');
        if (vp) {
            var column = vp.find('block column');
            column.innerHTML = "";
            
            var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
            if (cart && cart.length > 0) {
                var template = vp.find('block template');
                var c = 0;
                do {
                    var row = cart[c];
                    try {
                        var json = await ajax('/raw/merch/' + row.slug + '/merch.json');
                        if (is.json(json)) {
                            json = JSON.parse(json);
                            var el = template.content.firstElementChild.cloneNode(true);
                            el.find('picture img').src = json.images[0];
                            el.find('[placeholder="Title"]').textContent = json.title;
                            el.find('[type="number"]').setAttribute('value', row.quantity);
                            el.find('[placeholder="$0.00"]').textContent = '$' + json.pricing.ListPrice;
                            column.insertAdjacentHTML('beforeend', el.outerHTML);
                            console.log(369, {
                                el,
                                json,
                                row
                            });
                        }
                    } catch (e) {
                        console.log(381, {
                            e
                        });
                    }
                    c++;
                } while (c < cart.length);
            }
        }

        resolve(route);
    }
    );
}
);

window.mvc.c ? null : (window.mvc.c = controller = {});

controller.cart = {};
controller.cart.update = obj=>{
    //console.log(obj);
    var cart = localStorage.getItem('cart');
    if (cart) {
        cart = JSON.parse(cart);
    } else {
        cart = [];
    }
    if (cart.some(o=>o.slug === obj.slug)) {
        cart = cart.filter(function(o) {
            if (o.slug === obj.slug) {
                o.quantity = o.quantity + obj.quantity;
            }
            return o;
        })
    } else {
        cart.push(obj);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

controller.product = {};
controller.product.cart = event=>{
    event.preventDefault();
    var form = event.target;
    var dir = rout.ed.dir(route.path);
    var slug = dir.splice(form.closest('[data-merch]').dataset.merch).join('/');
    var quantity = parseInt(form.find('[data-value="post.quantity"]').value);
    0 > 1 ? console.log("controller.product.cart", {
        slug,
        quantity
    }) : null;
    if (slug && quantity > 0) {
        var obj = {
            quantity,
            slug
        };
        controller.cart.update(obj);
        '/cart/'.router();
    }
}
controller.product.quantity = target=>{
    var button = target.closest('row').find('input');
    var ico = target.closest('ico');
    if (button && ico) {
        var up = ico.find('.gg-chevron-up');
        var down = ico.find('.gg-chevron-down');
        button.value = button.value === '' ? 0 : button.value;
        if (up) {
            button.value = parseInt(button.value) + 1;
        }
        if (down && button.value > 0) {
            button.value = parseInt(button.value) - 1;
        }
    }
}
controller.product.traits = async(target)=>{
    var attributes = target.previousElementSibling;
    var variations = await modal.dropdown(target, {
        other: false,
        title: attributes.find('[placeholder]').value
    });

    var url = route.path;
    var values = [];
    var traits = target.closest('box > column').children;
    if (traits.length > 0) {
        var t = 0;
        do {
            var trait = traits[t];
            0 > 1 ? console.log(371, {
                traits,
                trait
            }) : null;
            var name = trait.find('field [placeholder]').textContent;
            var value = trait.find('dropdown [placeholder]').textContent;
            if (name.length > 0 && value.length > 0) {
                values.push(name.toLowerCase().replaceAll('-', '') + "-" + value.toLowerCase().replaceAll('-', '').replaceAll(' ', '-'));
            }
            t++;
        } while (t < traits.length);
        var matrix = values.join('_');
        if (matrix.length > 0) {
            //console.log(matrix, values);
            var dir1 = rout.ed.dir(route.path);
            var dir2 = rout.ed.dir(route.page);
            url = route.page.replace('*', dir1[dir2.length - 1] + "/" + matrix);
            console.log(url);
        }
        var vp = target.closest('pages');

        0 < 1 ? console.log({
            route,
            url,
            matrix,
            values
        }, {
            attributes,
            variations
        }, {
            matrix,
            traits,
            values
        }) : null;

        route.path === url ? null : url.router();
    }
}

mvc.c = controller;
