myTouch = {
    tap: function (el, callback) {
        var times = null,
            con = false;
        el.addEventListener('touchstart', function (e) {
            times = new Date();
            // console.log(e.touches[0].clientX)
        })
        el.addEventListener('touchmove', function () {
            con = true;
        })
        el.addEventListener('touchend', function () {
            var ends = new Date();
            var reduce = ends - times;
            if (reduce < 150 && (!con)) {
                callback && callback()
            }
        })
    },
    swip: function (el, geo, callback) {
        var start = null,
            cases = '',
            end = null;
        el.addEventListener('touchstart', function (e) {
            start = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            }
        })
        el.addEventListener('touchmove', function (e) {
            end = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            }
        })
        el.addEventListener('touchend', function () {
            if (end && geo == lot(start, end)) {
                callback && callback();
            }
            start = null;
            end = null;
        })

        function lot(start, end) {
            var wx = Math.abs(end.x - start.x),
                hy = Math.abs(end.y - start.y);
            if (wx > 50 || hy > 50) {
                if (wx > hy) {
                    if (end.x > start.x) {
                        cases = 'right';
                    } else if (end.x < start.x) {
                        cases = 'left'
                    }
                } else if (wx < hy) {
                    if (end.y > start.y) {
                        cases = 'bottom';
                    } else if (end.y < start.y) {
                        cases = 'top'
                    }
                }
            }
            return cases;
        }
    }
}