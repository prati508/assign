
function refreshPage(){
    window.location.reload();
}
$(document).ready(function () {

    var UserDetails = [
    {'First_name':'Pratibha', 'Middle_name':'1', 'Last_name':'Thakur', 'email':'abc@gmail.com', 'phone_number':'582500', 'role':'abc', 'address':'XYZ'},
    {'First_name':'Pratibha', 'Middle_name':'2', 'Last_name':'Thakur', 'email':'xyz@gmail.com', 'phone_number':'251198', 'role':'def', 'address':'XYZ'}
]
console.table(UserDetails);
refresh(UserDetails);
function refresh(){
    var table = document.getElementById("user");
    // console.log(data.length);
    UserDetails.forEach((UserDetail,index) => {
        var row = ` <tr class="${index}">
                            <td>${UserDetail.First_name}</td>
                            <td>${UserDetail.Middle_name}</td>
                            <td>${UserDetail.Last_name}</td>
                            <td>${UserDetail.email}</td>
                            <td>${UserDetail.phone_number}</td>
                            <td>${UserDetail.role}</td>
                            <td>${UserDetail.address}</td>
                            <td><button class="EditSave btn btn-info">Edit</button>
                                <button class="Cancel btn btn-danger" style="display:none;">cancel</button>
                                <button class="delete btn btn-danger">Delete</button>
                            </td>
                    </tr>`
        table.innerHTML += row
    });
}
    
    $('.EditSave').click(function () {
    //EDIT AND SAVE
        var id = ($(this).parents("tr").attr("class"));
        console.log(id);
        var currentTD = $(this).parents('tr').find('td').filter(function() {
            return $(this).find('.EditSave').length === 0;
        });//Get all the tds within tr 
        
        if ($(this).html() == 'Edit') {                  
            $.each(currentTD, function () {
                $(this).prop('contenteditable', true)//make every td editable 
                $(this).parents('tr').find('.Cancel').show();
                $(this).parents('tr').find('.delete').hide(); 
            });
        } else {
            $.each(currentTD, function () {
                $(this).prop('contenteditable', false) 
                $(this).parents('tr').find('.Cancel').hide();
                $(this).parents('tr').find('.delete').show(); 
            });
        }
        $(this).html($(this).html() == 'Edit' ? 'Save' : 'Edit');//save and cancel  
        
        var Oid = ($(this).parents("tr").attr("class"));
        var original = [UserDetails[Oid].First_name,
                            UserDetails[Oid].Middle_name,
                            UserDetails[Oid].Last_name,
                            UserDetails[Oid].email,
                            UserDetails[Oid].phone_number, 
                            UserDetails[Oid].role,
                            UserDetails[Oid].address]
        console.log(original);

        var table = document.getElementById("user");
        Oid++;
        for(var i=0;i<original.length;i++){
            if(original[i] != $(table.rows[Oid].cells[i]).text()){
                original[i] = $(table.rows[Oid].cells[i]).text();
            }
            //console.log(original[i]);
            // console.log($(table.rows[Oid].cells[i]).text())
        }
        //CANCEL BUTTON
            $('.Cancel').click(function(){
            
                var currentTD = $(this).closest('tr').find('td').filter(function() {
                    return $(this).find('.Cancel').length === 0;
                });
                
                $(this).hide();
                $(this).parents('tr').find('.EditSave').text('Edit');
                $(this).parents('tr').find('.delete').show(); 
                
                var i=0;                    
                    $.each(currentTD, function () {
                        $(this).prop('contenteditable', false);
                        $(this).text(original[i]);
                        i++; 
                    });                    
            });          
    });    
    
    $('.delete').click(function(){
        $(this).parents('tr').remove()
    });

});      
    


