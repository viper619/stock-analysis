let searchdata = {"bestMatches":[{"1. symbol":"AAP","2. name":"Advance Auto Parts Inc.","3. type":"Equity","4. region":"United States","5. marketOpen":"09:30","6. marketClose":"16:00","7. timezone":"UTC-05","8. currency":"USD","9. matchScore":"1.0000"},{"1. symbol":"AAPL","2. name":"Apple Inc.","3. type":"Equity","4. region":"United States","5. marketOpen":"09:30","6. marketClose":"16:00","7. timezone":"UTC-05","8. currency":"USD","9. matchScore":"0.8571"},{"1. symbol":"AAPT","2. name":"All American Pet Company Inc.","3. type":"Equity","4. region":"United States","5. marketOpen":"09:30","6. marketClose":"16:00","7. timezone":"UTC-05","8. currency":"USD","9. matchScore":"0.8571"},{"1. symbol":"AAPJ","2. name":"AAP Inc.","3. type":"Equity","4. region":"United States","5. marketOpen":"09:30","6. marketClose":"16:00","7. timezone":"UTC-05","8. currency":"USD","9. matchScore":"0.8571"},{"1. symbol":"AAPIX","2. name":"Aberdeen Asia Pacific (ex-Japan) Equity Fund Institutional Class","3. type":"Mutual Fund","4. region":"United States","5. marketOpen":"09:30","6. marketClose":"16:00","7. timezone":"UTC-05","8. currency":"USD","9. matchScore":"0.7500"},{"1. symbol":"AAPEX","2. name":"Aberdeen Asia Pacific (ex-Japan) Equity Fund Institutional Service Class","3. type":"Mutual Fund","4. region":"United States","5. marketOpen":"09:30","6. marketClose":"16:00","7. timezone":"UTC-05","8. currency":"USD","9. matchScore":"0.7500"},{"1. symbol":"AAPL34.SAO","2. name":"Apple Inc.","3. type":"Equity","4. region":"Brazil/Sao Paolo","5. marketOpen":"10:00","6. marketClose":"17:30","7. timezone":"UTC-03","8. currency":"BRL","9. matchScore":"0.5000"}]}

const searchCompany = (e) => 
{
    let name = e.target.value;

    if(name.length<2) 
    {
      document.getElementById('search-response').innerHTML = '';
      return;
    }

    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=1DD50Y8HJTETE72X`)
    .then(response => response.json())
    .then(companyData => 
      {
              let searchListHtml = '';
              companyData.bestMatches.forEach(element => {
                
                let htmlBlock = `<div class="search-card">
                                              <div class="search-company">
                                                  <span class="company-name" id="${element["1. symbol"]}">${element["1. symbol"]}</span>
                                                  <span class="company-ticker">${element["2. name"]}</span>
                                              </div>
                                              <div class="search-country">
                                                  ${element["4. region"]}
                                              </div>
                                          </div>`;

                searchListHtml+=htmlBlock;

              document.getElementById('search-response').innerHTML = searchListHtml;
            } );
      });
};



document.addEventListener('click', e => 
{
  const searchCard = e.target.closest('.search-card');
  if(searchCard!=null)
  {
    console.log(searchCard.children[0].children[0].id);
    location.href = `./fundamentals/${searchCard.children[0].children[0].id}`;
  }
});



window.onload =  e => 
{

  if(document.getElementById('search-company')===null) return;

  let name = document.getElementById('search-company').value;

  if(name.length<2) 
  {
    document.getElementById('search-response').innerHTML = '';
    return;
  }

  fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=  `)
  .then(response => response.json())
  .then(companyData => 
    {
            let searchListHtml = '';
            companyData.bestMatches.forEach(element => {
              
              let htmlBlock = `<div class="search-card">
                                            <div class="search-company">
                                                <span class="company-name" id="${element["1. symbol"]}">${element["1. symbol"]}</span>
                                                <span class="company-ticker">${element["2. name"]}</span>
                                            </div>
                                            <div class="search-country">
                                                ${element["4. region"]}
                                            </div>
                                        </div>`;

              searchListHtml+=htmlBlock;

            document.getElementById('search-response').innerHTML = searchListHtml;
          } );
    });
};

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

let parsedGraphData = JSON.parse(document.getElementById('daily-chart').getAttribute('data-dailygraphdata'));

  function drawChart() {
    var data = google.visualization.arrayToDataTable(parsedGraphData, true);

    var options = 
    {
          legend: 'none',
          bar: { groupWidth: '60%' }, // Remove space between bars.
          candlestick: 
          {
            fallingColor: { strokeWidth: 0, fill: '#f15656' }, // red
            risingColor: { strokeWidth: 0, fill: '#64ee5f' }   // green
          },
          animation:
          {
            startup:true,
            duration:500,
            easing:'out'
          },
          fontSize : 10
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

    chart.draw(data, options);
  }

