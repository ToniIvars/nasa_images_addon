document.addEventListener('DOMContentLoaded', function() {   
    const apod_container = document.getElementById('apod-container')
    const apod_title = document.getElementById('apod-title')
    const apod_image = document.getElementById('apod-image')
    const apod_video = document.getElementById('apod-video')
    const apod_yt_video = document.getElementById('apod-yt-video')
    const apod_copyright = document.getElementById('apod-copyright')

    const epic_container = document.getElementById('epic-container')
    const epic_image = document.getElementById('epic-image')
    const epic_date = document.getElementById('epic-date')

    const mars_container = document.getElementById('mars-container')
    const mars_image = document.getElementById('mars-image')
    const mars_date = document.getElementById('mars-date')
    const mars_camera = document.getElementById('mars-camera')
    const mars_rover = document.getElementById('mars-rover')

    function display_apod() {
        browser.storage.local.get()
        .then(store => {
            let apod_data = store['apod']
            
            apod_title.textContent = apod_data.title
            apod_copyright.textContent = `Copyright: ${apod_data.copyright}`

            if (apod_data.media_type === 'image') {
                apod_image.setAttribute('src', apod_data.url)
                apod_image.classList.remove('hidden')

            } else if (apod_data.url.includes('youtube.com')) {
                apod_yt_video.setAttribute('src', apod_data.url)
                apod_yt_video.classList.remove('hidden')
                
            } else {
                apod_video.setAttribute('src', apod_data.url)
                apod_video.classList.remove('hidden')
            }
        })
    }

    function display_epic() {
        browser.storage.local.get()
        .then(store => {
            let epic_data = store['epic']
            
            epic_date.textContent = epic_data.datetime
            epic_image.setAttribute('src', epic_data.url)
        })
    }

    function display_mars(rover) {
        browser.storage.local.get()
        .then(store => {
            let mars_data = store[`mars_${rover}`]
            let random = Math.floor(Math.random() * (mars_data.length+1))
            
            let image = mars_data[random]
            
            mars_camera.textContent = image.camera_name
            mars_camera.setAttribute('title', image.camera_full_name)
            mars_date.textContent = image.date
            mars_rover.textContent = rover
            mars_image.setAttribute('src', image.url)
        })
    }

    function change_display(type) {
        if (type === 'apod') {
            epic_container.classList.add('hidden')
            mars_container.classList.add('hidden')
            apod_container.classList.remove('hidden')
            display_apod()

        } else if (type === 'epic') {
            mars_container.classList.add('hidden')
            apod_container.classList.add('hidden')
            epic_container.classList.remove('hidden')
            display_epic()

        } else if (type === 'mars') {
            apod_container.classList.add('hidden')
            epic_container.classList.add('hidden')
            mars_container.classList.remove('hidden')
            display_mars('perseverance')
        }
    }

    document.getElementById('btn-apod').onclick = () => change_display('apod')
    document.getElementById('btn-epic').onclick = () => change_display('epic')
    document.getElementById('btn-mars').onclick = () => change_display('mars')

    document.getElementById('btn-perseverance').onclick = () => display_mars('perseverance')
    document.getElementById('btn-curiosity').onclick = () => display_mars('curiosity')

    display_apod()
})