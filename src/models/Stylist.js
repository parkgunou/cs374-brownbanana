
export class Stylist {
    
    constructor(json) {
        this.name = json.name
        this.salon = json.salon
        this.intro = json.intro
        this.profile_img_url = json.profile_img_url
        this.style_keys = 'style_keys' in json ? json.style_keys : []
        this.review_keys = 'review_keys' in json ? json.review_keys : []
        this.menu_keys = 'menu_keys' in json ? json.menu_keys : []
        this.created_at = new Date(json.created_at)
    }
}