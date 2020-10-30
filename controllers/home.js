exports.home = (req,res,next) => 
{
    res.render('search', {pageName: 'Search'});
}