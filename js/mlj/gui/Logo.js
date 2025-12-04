(function (component) {
    
    /**         
     * @class Create a new Logo widget
     * @augments  MLJ.gui.Widget
     * @private
     * @memberOf MLJ.gui.widget
     * @author Stefano Gabriele 
     */
    var _Logo = function () {

        var LOGO_WIDTH = 96;
        // var LOGO_HEIGHT = 821 * LOGO_WIDTH / 1023;
        var LOGO_HEIGHT = 821 * LOGO_WIDTH / 1023;
        var insets = 10;
        var _PiP;
        var _dialog = new MLJ.gui.component.Dialog(
            {
                title: "KneeView - Filter and Select Models",
                draggable: true,
                width: 1220,
                modal: true,
                resizable: true,
                open: function() {
                    $(this).dialog('option', 'position', {my: "center", at: "center", of: window});
                }
            }
        );

        var kneeData = [];
        var dataLoaded = false;

        this._make = function () {
            _PiP = new component.PiP();

            var $logo = $('<img id="logo" src="https://cdn-icons-png.flaticon.com/512/2080/2080946.png">')
                //.hide(); // Hide the logo initially

            // Create the dashboard HTML
            var dashboardHTML = `
                <div id="kneeview-dashboard" style="padding: 20px; font-family: Arial, sans-serif;">
                    <style>
                        #kneeview-dashboard h3 { margin-top: 0; color: #333; }
                        .filter-section { margin-bottom: 20px; background: #f5f5f5; padding: 15px; border-radius: 5px; }
                        .filter-row { display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 10px; }
                        .filter-item { flex: 1; min-width: 150px; }
                        .filter-item label { display: block; margin-bottom: 5px; font-weight: bold; font-size: 12px; }
                        .filter-item select, .filter-item input { width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 3px; }
                        .filter-buttons { display: flex; gap: 10px; margin-top: 10px; }
                        .filter-buttons button { padding: 8px 20px; cursor: pointer; border: none; border-radius: 3px; font-weight: bold; }
                        .btn-apply { background: #4CAF50; color: white; }
                        .btn-reset { background: #f44336; color: white; }
                        .btn-apply:hover { background: #45a049; }
                        .btn-reset:hover { background: #da190b; }
                        #results-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        #results-table th, #results-table td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
                        #results-table th { background-color: #4CAF50; color: white; position: sticky; top: 0; }
                        #results-table tr:nth-child(even) { background-color: #f2f2f2; }
                        #results-table tr:hover { background-color: #ddd; cursor: pointer; }
                        .results-container { max-height: 400px; overflow-y: auto; margin-top: 15px; }
                        .result-count { margin-top: 10px; font-weight: bold; color: #4CAF50; }
                        .load-model-btn { background: #2196F3; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 11px; }
                        .load-model-btn:hover { background: #0b7dda; }
                    </style>

                    <div class="filter-section">
                        <div class="filter-row">
                            <div class="filter-item">
                                <label>Age Range:</label>
                                <div style="display: flex; gap: 5px;">
                                    <input type="number" id="age-min" placeholder="Min" min="0" max="100">
                                    <input type="number" id="age-max" placeholder="Max" min="0" max="100">
                                </div>
                            </div>
                            <div class="filter-item">
                                <label>Sex:</label>
                                <select id="sex-filter">
                                    <option value="">All</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                            </div>
                            <div class="filter-item">
                                <label>BMI Range:</label>
                                <div style="display: flex; gap: 5px;">
                                    <input type="number" id="bmi-min" placeholder="Min" step="0.1">
                                    <input type="number" id="bmi-max" placeholder="Max" step="0.1">
                                </div>
                            </div>
                            <div class="filter-item">
                                <label>KL Score:</label>
                                <select id="kl-filter">
                                    <option value="">All</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </div>
                        <div class="filter-row">
                            <div class="filter-item">
                                <label>Side:</label>
                                <select id="side-filter">
                                    <option value="">All</option>
                                    <option value="L">Left</option>
                                    <option value="R">Right</option>
                                </select>
                            </div>
                            <div class="filter-item">
                                <label>Weight Range (kg):</label>
                                <div style="display: flex; gap: 5px;">
                                    <input type="number" id="weight-min" placeholder="Min" step="0.1">
                                    <input type="number" id="weight-max" placeholder="Max" step="0.1">
                                </div>
                            </div>
                            <div class="filter-item">
                                <label>Height Range (cm):</label>
                                <div style="display: flex; gap: 5px;">
                                    <input type="number" id="height-min" placeholder="Min">
                                    <input type="number" id="height-max" placeholder="Max">
                                </div>
                            </div>
                        </div>
                        <div class="filter-buttons">
                            <button class="btn-apply" onclick="window.applyFilters()">Apply Filters</button>
                            <button class="btn-reset" onclick="window.resetFilters()">Reset</button>
                        </div>
                    </div>

                    <div class="result-count" id="result-count">Loading data...</div>

                    <div class="results-container">
                        <table id="results-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Age</th>
                                    <th>Sex</th>
                                    <th>Height</th>
                                    <th>Weight</th>
                                    <th>BMI</th>
                                    <th>Side</th>
                                    <th>KL Score</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="results-body">
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            _dialog.appendContent(dashboardHTML);

            // Function to calculate and set min/max values from data
            function setDefaultFilterValues() {
                if (kneeData.length === 0) return;

                // Calculate min/max for Age
                var ages = kneeData.map(function(item) { return item.Age; });
                var ageMin = Math.min.apply(null, ages);
                var ageMax = Math.max.apply(null, ages);
                $('#age-min').val(ageMin);
                $('#age-max').val(ageMax);

                // Calculate min/max for BMI
                var bmis = kneeData.map(function(item) { return item.BMI; });
                var bmiMin = Math.min.apply(null, bmis);
                var bmiMax = Math.max.apply(null, bmis);
                $('#bmi-min').val(bmiMin.toFixed(1));
                $('#bmi-max').val(bmiMax.toFixed(1));

                // Calculate min/max for Weight
                var weights = kneeData.map(function(item) { return item['Weight (kg)']; });
                var weightMin = Math.min.apply(null, weights);
                var weightMax = Math.max.apply(null, weights);
                $('#weight-min').val(weightMin);
                $('#weight-max').val(weightMax);

                // Calculate min/max for Height
                var heights = kneeData.map(function(item) { return item.Height; });
                var heightMin = Math.min.apply(null, heights);
                var heightMax = Math.max.apply(null, heights);
                $('#height-min').val(heightMin);
                $('#height-max').val(heightMax);
            }

            // Load the JSON data
            $.getJSON('js/kneeview_data.json', function(data) {
                kneeData = data;
                dataLoaded = true;
                console.log('Knee data loaded: ' + kneeData.length + ' records');

                // Set default min/max values in filter inputs
                setDefaultFilterValues();

                // Update the result count to show data is ready
                $('#result-count').text('Data loaded: ' + kneeData.length + ' models available. Click "Apply Filters" to view all.');
            }).fail(function() {
                $('#result-count').text('Error loading data!').css('color', 'red');
                console.error('Failed to load kneeview_data.json');
            });

            // Filter functions
            window.applyFilters = function() {
                var ageMin = parseFloat($('#age-min').val()) || 0;
                var ageMax = parseFloat($('#age-max').val()) || 999;
                var sex = $('#sex-filter').val();
                var bmiMin = parseFloat($('#bmi-min').val()) || 0;
                var bmiMax = parseFloat($('#bmi-max').val()) || 999;
                var klScore = $('#kl-filter').val();
                var side = $('#side-filter').val();
                var weightMin = parseFloat($('#weight-min').val()) || 0;
                var weightMax = parseFloat($('#weight-max').val()) || 9999;
                var heightMin = parseFloat($('#height-min').val()) || 0;
                var heightMax = parseFloat($('#height-max').val()) || 999;

                var filtered = kneeData.filter(function(item) {
                    return item.Age >= ageMin && item.Age <= ageMax &&
                           (sex === '' || item.Sex === sex) &&
                           item.BMI >= bmiMin && item.BMI <= bmiMax &&
                           (klScore === '' || item['KL-score'].toString() === klScore) &&
                           (side === '' || item['Left/Right'] === side) &&
                           item['Weight (kg)'] >= weightMin && item['Weight (kg)'] <= weightMax &&
                           item.Height >= heightMin && item.Height <= heightMax;
                });

                displayResults(filtered);
            };

            window.resetFilters = function() {
                // Restore default min/max values from the dataset
                setDefaultFilterValues();
                // Clear dropdown filters
                $('#sex-filter, #kl-filter, #side-filter').val('');
                window.applyFilters();
            };

            function displayResults(data) {
                var tbody = $('#results-body');
                tbody.empty();

                $('#result-count').text('Found ' + data.length + ' matching models');

                data.forEach(function(item) {
                    var modelId = 'K' + String(item['K NR']).padStart(3, '0');
                    var row = $('<tr>');
                    row.append($('<td>').text(modelId));
                    row.append($('<td>').text(item.Age));
                    row.append($('<td>').text(item.Sex));
                    row.append($('<td>').text(item.Height));
                    row.append($('<td>').text(item['Weight (kg)']));
                    row.append($('<td>').text(item.BMI.toFixed(2)));
                    row.append($('<td>').text(item['Left/Right']));
                    row.append($('<td>').text(item['KL-score']));

                    var loadBtn = $('<button class="load-model-btn">Load Model</button>');
                    loadBtn.click(function() {
                        window.location.href = '?filenamePrefix=' + modelId;
                    });
                    row.append($('<td>').append(loadBtn));

                    tbody.append(row);
                });
            }

            $logo.load(function () {
                _PiP.appendContent(this);
                $(this).width(LOGO_WIDTH);
            });

            $logo.css('cursor', 'pointer');

            $(document).ready(function () {
                var x = $('#mlj-tools-pane').outerWidth() + insets;
                var y = $(window).height() - LOGO_HEIGHT - insets;
                _PiP.setX(x);
                _PiP.setY(y);
            });

            $(window).resize(function () {
                var $tp = $('#mlj-tools-pane');
                var newX = $tp.outerWidth() + $tp.offset().left + insets;
                var newY = $(window).height() - LOGO_HEIGHT - insets;
                _PiP.setX(newX);
                _PiP.setY(newY);
            });

            var $tabbedPane = $('#mlj-tabbed-pane');
            var isPaneVisible = true;

            $tabbedPane.on('tabsactivate', function () {
                if (isPaneVisible) {
                    $logo.hide();
                } else {
                    $logo.show();
                }
            });

            // Add event listener to the logo button to show the dialog on click
            $logo.click(function () {
                if (!dataLoaded) {
                    // Data not yet loaded, show a temporary message
                    alert('Loading data, please wait...');
                    return;
                }
                // Data is loaded, show the dialog and display all records
                _dialog.show();
                // Ensure filter values are set with dataset min/max
                setDefaultFilterValues();
                // Center the dialog on the screen after a brief delay to ensure it's rendered
                setTimeout(function() {
                    _dialog.$.dialog('option', 'position', {my: "center", at: "center", of: window});
                }, 50);
                // Automatically apply filters to show all data
                window.applyFilters();
            });

            return _PiP.$;
        };
    };

    MLJ.extend(MLJ.gui.Widget, _Logo);

    // Install widget
    MLJ.gui.installWidget("Logo", new _Logo());

})(MLJ.gui.component);
