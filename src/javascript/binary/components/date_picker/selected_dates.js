DatePicker.SelectedDates = function(component_id, select_type) {
    this.component_id = component_id;
    this._super = new DatePicker(component_id, select_type);
    this.dates = [];

    var that = this;
    $(this._super).on('enter_pressed', function() {
        $(that).trigger('enter_pressed');
    });

    $(this._super).on('change', function(event, selected) {
        $(that).trigger('change', [ selected ]);
    });
};

DatePicker.SelectedDates.prototype = {
    show: function(dates) {
        this.dates = dates;
        this._super.create(this.config());
    },
    hide: function() {
        if($('#' + this.component_id + '.hasDatepicker').length > 0)
            $('#' + this.component_id).datepicker('destroy');
    },
    config: function() {
        var config = this._super.config();
        var that = this;
        config.beforeShowDay = function(date) {
            var lookup = moment.utc([ date.getFullYear(), date.getMonth(), date.getDate() ]).format("YYYY-MM-DD");
            if(that.dates.indexOf(lookup) >= 0) {
                return [1];
            }

            return [0];
        };

        config.beforeShow = function(input, inst) {
            return { defaultDate: $('#' + that.component_id).val()};
        };

        return config;
    },
};
