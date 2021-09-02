document.addEventListener('DOMContentLoaded', function() {   
    const apod_container = document.getElementById('apod-container')
    const apod_title = document.getElementById('apod-title')
    const apod_image = document.getElementById('apod-image')
    const apod_video = document.getElementById('apod-video')
    const apod_copyright = document.getElementById('apod-copyright')

    const epic_container = document.getElementById('epic-container')
    const epic_image = document.getElementById('epic-image')
    const epic_date = document.getElementById('epic-date')

    function display_apod() {
        browser.storage.local.get()
        .then(store => {
            let apod_data = store['apod']
            
            apod_title.textContent = apod_data.title
            apod_copyright.textContent = `Copyright: ${apod_data.copyright}`

            if (apod_data.media_type === 'image') {
                apod_image.setAttribute('src', apod_data.url)
                apod_image.classList.remove('hidden')
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

    function change_display(type) {
        if (type === 'apod') {
            apod_container.classList.remove('hidden')
            epic_container.classList.add('hidden')
            display_apod()

        } else if (type === 'epic') {
            epic_container.classList.remove('hidden')
            apod_container.classList.add('hidden')
            display_epic()
        }
    }

    document.getElementById('btn-apod').onclick = () => change_display('apod')
    document.getElementById('btn-epic').onclick = () => change_display('epic')

    display_apod()
})