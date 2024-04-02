// data_table = document.getElementById("datatable");
// data_table.DataTable();
$(function() {
    $('table').DataTable();

    /** Creer une facture */
    $('#create').on('click', function(e) {
        let formOrder = $('#formOrder');
        if (formOrder[0].checkValidity()) {
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "process.php",
                data: formOrder.serialize() + '&action=create',
                // dataType: "dataType",
                success: function (response) {
                    // console.log(response);
                    $('#createModal').modal('hide');
                    Swal.fire({
                        // position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        // showConfirmButton: false,
                        // timer: 1500
                    });
                    formOrder[0].reset();
                }
            });
        }
    })


    $('body').on('click', '.editBtn', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'process.php',
            type: 'post',
            data: {workingId: this.dataset.id},
            success: function(response) {
                // console.log(response);
                let billDetails = JSON.parse(response);
                $('#update-customer').val(billDetails.customer);
                $('#update-cashier').val(billDetails.cashier);
                $('#update-amount').val(billDetails.amount);
                $('#update-received').val(billDetails.received);
                
                let select = document.querySelector('#update-state');
                let stateOptions = Array.from(select.options);
                stateOptions.forEach((o, i) => {
                    if (o.value === billDetails.state)
                        select.selectedIndex = i;
                })
            }
        })
    })

    /** Recuperation des factures */
    function getBills() {
        $.ajax({
            url: 'process.php',
            type: 'post',
            data: {action: 'fetch'},
            success: function(response) {
                // console.log(response);
                $("#orderTable").html(response);
                $('table').DataTable({order: [0, 'desc']});
            }
        });
    }


    getBills();
})
