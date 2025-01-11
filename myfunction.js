// دالة لعرض تفاصيل الصف عند تحديد مربع الاختيار
function Details(checkbox, detailsId) {
    $("#" + detailsId).toggle(checkbox.checked); // عرض أو إخفاء التفاصيل باستخدام `toggle`
}
// دالة للتحقق من اختيار كتاب والبدء في عرض النموذج
function clickbuttun() {
    var selected = $("input[name='bookSelect']:checked").length > 0; // التحقق من اختيار كتاب
    if (selected) {
        ShowForm();
    } else {
        alert("يرجى اختيار كتاب للمتابعة."); // رسالة تنبيه إذا لم يتم اختيار أي كتاب
    }
}
// دالة لعرض النموذج
function ShowForm() {
    $("#show1").removeAttr("hidden").get(0).scrollIntoView({
        behavior: "smooth" 
    });
}
// دالة للتحقق من صحة إدخال النموذج
function validateForm() {
    var message = {};
    var hasError = false;

    // التحقق من الاسم
    var nameValue = $("input[name='name']").val();
    if (!/^[\u0600-\u06FF\s]+$/.test(nameValue)) {
        message['name'] = "يرجى إدخال الاسم باللغة العربية فقط.";
        hasError = true;
    }
    // التحقق من الرقم الوطني
    var idValue = $("input[name='ID_number']").val();
    if (!idValue) {
        message['ID_number'] = "يرجى إدخال الرقم الوطني.";
        hasError = true;
    } else if (idValue.length !== 11 || isNaN(idValue)) {
        message['ID_number_format'] = "يجب أن يتكون الرقم الوطني من 11 رقمًا صحيحًا.";
        hasError = true;
    } else {
        var prefix = idValue.substring(0, 2); // استخراج أول رقمين من الرقم الوطني
        if (!["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"].includes(prefix)) {
            message['ID_number_prefix'] = "يجب أن يبدأ الرقم الوطني بأحد الأرقام: 01 إلى 14.";
            hasError = true;
        }
    }
  // التحقق من رقم الهاتف
    var phoneValue = $("input[name='phone']").val();
    if (!/^09\d{8}$/.test(phoneValue)) {
        message['phone'] = "رقم الهاتف يجب أن يتكون من 10 أرقام ويبدأ بـ 09.";
        hasError = true;
    }
    // عرض الرسائل إذا كانت هناك أخطاء
    if (hasError) {
        alert(Object.values(message).join("\n")); // عرض جميع الرسائل
        return false;
    }
    showBookDetails(); // عرض تفاصيل الكتاب المختار
    return true;
}
// دالة لعرض تفاصيل الكتاب المختار
function showBookDetails() {
    var selectedBook = $("input[name='bookSelect']:checked").val(); // تحديد الكتاب المختار
    if (selectedBook) {
        const bookDetails = {
            "1": {
                title: "نظرية الفستق",
                author: "دار الحضارة للنشر والتوزيع",
                price: "30000 ل.س",
                description: "كتاب يختص بتنمية الذات وتحقيق النجاح.",
            },
            "2": {
                title: "الدولة الأموية في الشام",
                author: "مكتبة المشرق",
                price: "45000 ل.س",
                description: "معلومات تاريخية حول الدولة الأموية.",
            },
            "3": {
                title: "الف ليلة وليلة",
                author: "دار المعارف",
                price: "25000 ل.س",
                description: "كتاب يضم مجموعة من القصص الشعبية.",
            },
            "4": {
                title: "غربة الياسمين",
                author: "كيان للنشر والتوزيع",
                price: "40000 ل.س",
                description: "رواية عن فتاة شخصيّتها قويّة وثابتة، مثل رائحة الياسمين النفّاذة والفريدة.",
            },
            "5": {
                title: "محاط بالحمقى",
                author: "الحافظ للنشر والتوزيع",
                price: "35000 ل.س",
                description: "كتاب لمعرفة الأنماط الأربعة للسلوك البشري وكيفية التعامل معها.",
            }
        };
        const details = bookDetails[selectedBook]; // استرجاع تفاصيل الكتاب
        if (details) {
            const detailsMessage = `
                الكتاب المختار: ${details.title}
                المؤلف: ${details.author}
                السعر: ${details.price}
                الوصف: ${details.description}
            `;
            alert(detailsMessage);
        } else {
            alert("تفاصيل الكتاب غير موجودة."); // رسالة تنبيه عند عدم وجود تفاصيل
        }
    } else {
        alert("يرجى اختيار كتاب أولاً."); // رسالة تنبيه عند عدم اختيار كتاب
    }
}