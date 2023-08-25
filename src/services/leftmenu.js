export const Leftmenu = () => {
    const menus = [
        { menu: "Dashboard", url: 'dashboard', container: "Dashboard Container", ischild: false, icon: "icon-home", child: [{ menu: "", url: '' }] },
        { menu: "Category", url: 'category', container: "Category Container", ischild: false, icon: "icon-badge", child: [{ menu: "", url: '' }] },
        { menu: "Sub Category", url: 'subcategory', container: "SubCategory Container", ischild: false, icon: "icon-book-open", child: [{ menu: "", url: '' }] },
        { menu: "Item Size", url: 'itemsize', container: "ItemSize Container", ischild: false, icon: "icon-speedometer", child: [{ menu: "", url: '' }] },
        { menu: "Products", url: 'products addproducts editproducts', container: "Products Container", ischild: true, icon: "icon-basket-loaded", child: [{ menu: "Add Products", url: 'addproducts', container: "Products Container" }, { menu: "Products List", url: 'products', container: "Products Container" }] },
        { menu: "Kitchen Code", url: 'kitchencode kitchensection', container: "KitchenCode Container", ischild: true, icon: "icon-basket-loaded", child: [{ menu: "Kitchen Section", url: 'kitchensection', container: "KitchenCode Container" }, { menu: "Kitchen Format", url: 'kitchencode', container: "KitchenCode Container" }] },
        { menu: "Customers", url: 'customers', container: "Customers Container", ischild: false, icon: "icon-users", child: [{ menu: "", url: '' }] },
        { menu: "Orders", url: 'orders', container: "Orders Container", ischild: false, icon: "icon-basket-loaded", child: [{ menu: "", url: '' }] },
        { menu: "Custom Menu", url: 'custommenu', container: "CustomMenu Container", ischild: false, icon: "icon-notebook", child: [{ menu: "", url: '' }] },
        { menu: "Custom Menu Item", url: 'custommenuitem', container: "CustomItem Container", ischild: false, icon: "icon-notebook", child: [{ menu: "", url: '' }] },
        { menu: "Gift Card", url: 'giftcard', container: "GiftCard Container", ischild: false, icon: "icon-notebook", child: [{ menu: "", url: '' }] },
        //{ menu: "POS & Schedule", url: 'pos', ischild: false, icon: "icon-clock", child: [{ menu: "", url: '' }] },
        //{ menu: "Custom Menu", url: 'custommenu custommenuitem', ischild: true, icon: "icon-settings", child: [{ menu: "Custom Menu", url: 'custommenu' }, { menu: "Custom Menu Item", url: 'custommenuitem' }] },
        { menu: "Settings", url: 'pos sorting aboutus contactus editcontactus notification banner editbanner addbanner addaboutus editaboutus colorpicker', container: "Settings Container", ischild: true, icon: "icon-settings", child: [{ menu: "POS & Schedule", url: 'pos', container: "Settings Container" }, { menu: "General", url: 'general', container: "Settings Container" }, { menu: "Sorting", url: 'sorting', container: "Settings Container" }, { menu: "Banner", url: 'banner', container: "Settings Container" }, { menu: "Notification", url: 'notification', container: "Settings Container" }, { menu: "About Us", url: 'aboutus', container: "Settings Container" }, { menu: "Contact Us", url: 'contactus', container: "Settings Container" }, { menu: "Color Picker", url: 'colorpicker', container: "Settings Container" }] },
        { menu: "Reports", url: 'reports', container: "Reports Container", ischild: false, icon: "icon-notebook", child: [{ menu: "", url: '' }] },

    ]
    return menus;
};