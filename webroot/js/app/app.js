/*
 * app.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

(function(){

  /** 1ページあたりの表示データ数 */
  var _PAGING_ = 3;
  /** 全データ */
  var items = null;

  /**
   * ready
   */
  $(function(){
    /*
     * データをサーバーから取得する
     */
    getData('data/items.json', function(result){
      if (result == null) {
        return;
      }
      items = result;

      /*
       * 初期状態表示(全件データを表示する)
       */
      display(items);
    });

    /* ラジオイベント登録 */
    $('#typea').change(function(){
      search();
    });
    /* ラジオイベント登録 */
    $('#typeb').change(function(){
      search();
    });

  });

  /**
   * 検索処理
   */
  function search()
  {
    if (items === null) return;
    /*
     * チェック状態を調べる
     */
    var typea = false;
    var typeb = false;
    if($("#typea").prop('checked')) {
      typea = true;
    } else {
      typea = false;
    }
    if($("#typeb").prop('checked')) {
      typeb = true;
    } else {
      typeb = false;
    }
    /*
     * フィルタリングする
     */
    var filterd0_items = new Array();
    for (var i=0; i<items.length; i++) {
      if (items[i].typea == typea) {
        filterd0_items.push(items[i]);
      }
    }
    var filterd1_items = new Array();
    for (var i=0; i<filterd0_items.length; i++) {
      if (filterd0_items[i].typeb == typeb) {
        filterd1_items.push(filterd0_items[i]);
      }
    }
    // データを表示する
    display(filterd1_items);
  }

  /**
   * データ表示処理
   */
  function display(datas)
  {
    var count = 0;
    var page_sel = 'page-' + count;
    $('#search_result').empty();
  
    for (var i=0; i<datas.length; i++) {
      if (i % _PAGING_ === 0) {
        count++;
        $('#search_result').append('<dl class="selection" id="page-' + count + '">');
        page_sel = 'page-' + count;
      }
      $('#' + page_sel).append('<dt>' + datas[i].item_name + '</dt>' + '<dd>' + datas[i].img + datas[i].description + '</dd>');
    }

    /*
     * pagination
     */
    $("#paging").pagination({
      items: Math.ceil(datas.length / _PAGING_), //総ページ数
      displayedPages: 1,
      cssStyle: 'light-theme',
      prevText: '前',
      nextText: '次',
      onPageClick: function(pageNumber)
      {
        show(pageNumber);
      }
    });
    /** show method */
    function show(pageNumber)
    {
      var page="#page-"+pageNumber;
      $('.selection').hide()
      $(page).show()
    }

    //1ページ目表示
    show(1);
  }

  /**
   * getData function
   */
  function getData(url, callback_function)
  {
    $.ajax({
      url: url,
      timeout: 30000,
      contentType: 'application/json',
      dataType: 'json',
      success: function(result_data)
      {
        callback_function(result_data);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown)
      {
        alert('通信エラーが発生しました。');
        callback_function(null);
      }
    });
  }

}());
