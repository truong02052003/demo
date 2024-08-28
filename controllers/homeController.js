const Banner = require('../models/bannerModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const index = (req, res) => {
    Banner.getFirstBanner((err, topBanner) => {
        if (err) return res.send('Internal Server Error');
        
        Product.getAll((err, allProducts) => {
            if (err) return res.send('Internal Server Error');
            
            Category.getAllCategories((err, categories) => {
                if (err) return res.send('Internal Server Error');
                
                const productsWithCategories = allProducts.map(product => {
                    const category = categories.find(cat => cat.id === product.category_id);
                    return { ...product, cat: category };
                });

                const newsProducts = productsWithCategories.slice(0, 2);
                const saleProducts = productsWithCategories.filter(p => p.sale_price > 0).slice(0, 3);
                const hotProducts = productsWithCategories.sort(() => Math.random() - 0.5).slice(0, 4);
                const carts = req.session.carts || [];

                res.render('home/index', {
                    topBanner,
                    news_products: newsProducts,
                    sale_products: saleProducts,
                    hot_products: hotProducts,
                    gallerys: [],
                    userAuthenticated: req.isAuthenticated(),
                    user: req.user || null, 
                    categories,
                    carts
                });
            });
        });
    });
};

const about = (req, res) => {
    res.render('home/about');
};


    const category = (req, res) => {
        const categoryId = req.params.catId;
        Banner.getFirstBanner((err, topBanner) => {
            if (err) return res.send('Internal Server Error');
        // Lấy tất cả các sản phẩm và danh mục
        Product.getAll((err, allProducts) => {
            if (err) return res.send('Internal Server Error');
    
            // Lọc sản phẩm theo danh mục
            const products = allProducts.filter(p => p.category_id == categoryId)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); 
            const newsProducts = allProducts.slice(0, 3); // Lấy 3 sản phẩm mới nhất
    
            // Lấy danh mục để truyền vào view
            Category.getAllCategories((err, categories) => {
                if (err) return res.send('Internal Server Error');
    
                
                const userAuthenticated = req.isAuthenticated(); 
                const user = req.user || null; 
                const carts = req.session.carts || [];
                const categoryMap = categories.reduce((map, cat) => {
                    map[cat.id] = cat.name;
                    return map;
                }, {});
                const images = Array.isArray(product.images) ? product.images : [];
                res.render('home/category', {
                    cat: { id: categoryId },
                    products,
                    news_products: newsProducts,
                    categories, 
                    userAuthenticated, 
                    user, 
                    carts ,
                    topBanner,categoryMap,
                    images
                });
            });
        });
    });
}



const product = (req, res) => {
    const productId = req.params.productId;
    
    Product.getById(productId, (err, product) => {
        if (err) return res.send('Internal Server Error');
        if (!product) return res.status(404).send('Product not found');

        // Get all products to find related products in the same category
        Product.getAll((err, allProducts) => {
            if (err) return res.send('Internal Server Error');

            // Filter products by category_id and exclude the current product
            const products = allProducts
                .filter(p => p.category_id === product.category_id && p.id !== productId)
                .slice(0, 12); // Get 12 related products

            res.render('home/product', {
                product,
                products
            });
        });
    });
};


module.exports = {
    index,
    about,
    category,
    product
};
