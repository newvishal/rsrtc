# Rsrtc

## Development server
```
 const modalRef = this.confirmModalServ.open("200px", "400px", "Confirm", "Are you Sure ?", true, true, "ok", "cancel");
    modalRef.afterClosed().subscribe(result => {
    const { event } = result;
    if(event === 'Close') {
        cancel code
        return;
    }
        after accept code
    });
```