import('./api_key.js').then(obj => {
    const API_KEY = obj.API_KEY

    function get_apod_data() {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
        .then(resp => resp.json()).then(data => {
            browser.storage.local.set({
                apod: {
                    title: data.title,
                    media_type: data.media_type,
                    url: data.url,
                    copyright: data.copyright
                }
            })
        })
    }

    const adjust_datetime = (date, time) => `${date[2]}/${date[1]}/${date[0]} - ${time}`

    function get_epic_data() {
        fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${API_KEY}`)
        .then(resp => resp.json()).then(data => {
            let keys = Object.keys(data)

            let recent_info = data[keys[keys.length - 1]]
            let identifier = recent_info.image
            let date = recent_info.date.split(' ')[0].split('-')

            let url = `https://epic.gsfc.nasa.gov/archive/natural/${date[0]}/${date[1]}/${date[2]}/jpg/${identifier}.jpg`
            
            browser.storage.local.set({
                epic: {
                    url: url,
                    datetime: adjust_datetime(date, recent_info.date.split(' ')[1])
                }
            })
        })
    }

    function fetcher() {
        get_apod_data()
        get_epic_data()
    }

    fetcher()
    setInterval(fetcher, 1200000)
})