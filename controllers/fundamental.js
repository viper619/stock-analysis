const fetch = require('node-fetch');
const mockData = require('../data');
const axios = require('axios');



exports.loadFundamentals = (req,res,next) => 
{

    axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${req.params.company}&apikey=1DD50Y8HJTETE72X`)
    .then(function (response) 
    {
      console.log(response);
    })
    .catch(function (error) 
    {

    })
    .then(function () 
    {

    });

    fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${req.params.company}&apikey=1DD50Y8HJTETE72X`)
    .then(response => response.json())
    .then(companyData => 
    {
        let description = '';

        if(companyData!==undefined && companyData.Description!==undefined)
        {
            description = companyData.Description.split(' ',50).join(' ') + ' ...';
        }
        else
        {
            description = '';
        }
        
        let data=[];
        
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.params.company}&apikey=1DD50Y8HJTETE72X`)
        .then(response => response.json())
        .then(graphdata => 
        {
            let dailyTimeSeries = graphdata["Time Series (Daily)"];
            for(const date in dailyTimeSeries)
            {
                data.push([  date, 
                                      parseInt( dailyTimeSeries[date]['3. low'] ),
                                      parseInt( dailyTimeSeries[date]['1. open'] ),
                                      parseInt(  dailyTimeSeries[date]['4. close'] ),
                                      parseInt(  dailyTimeSeries[date]['2. high'] ),
                                    ]);
    
              if(data.length >= 17) break;
            }
              
            res.render('fundamentals', {pageName: 'Fundamentals', 'data': companyData, 'description': description, 'dailyGraphData': JSON.stringify(data)});
        });
    });
}