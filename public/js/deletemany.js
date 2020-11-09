//当全选按钮点击之后,他所有的子按钮和它状态相同
$('#selectAll').on('change', function () {
    let status = $(this).prop('checked');
    $('#tbody').find('.select').prop('checked', status);
    //当全选按钮选定的时候我们让批量按钮显示=
    if (status) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
})
//子按钮的选定树龄影响全选按钮
$('#tbody').on('change', '.select', function () {
    //当子按钮的选定状态为checked的数量为$('.selected')的数量
    if ($('.select:checked').length === $('.select').length) {
        $('#selectAll').prop('checked', true);
    } else {
        $('#selectAll').prop('checked', false);
    }
    if ($('.select:checked').length >= 1) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
})