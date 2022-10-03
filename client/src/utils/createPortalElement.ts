export function createPortalElement() {
    var portal = document.createElement('div');
    portal.id = 'portal';
    document.append(portal);
    return portal;
}
