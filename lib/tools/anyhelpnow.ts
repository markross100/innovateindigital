export const anyhelpnowHtml = String.raw`
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>anyhelpnow · Lead Intelligence</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<style>
  :root {
    --dark: #1A1E35;
    --dark2: #2A2E50;
    --orange: #F05A1E;
    --orange2: #FF8C5A;
    --orange3: #FFBA9A;
    --orange4: #FFE5D8;
    --cream: #FFFAF8;
    --white: #FFFFFF;
    --gray1: #F5F5F5;
    --gray2: #E0E0E0;
    --gray3: #999;
    --text: #333;
    --text2: #666;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; background: #F0F0F0; color: var(--text); font-size: 14px; }

  /* HEADER */
  header { background: var(--dark); color: white; padding: 0 32px; display: flex; align-items: center; height: 56px; gap: 12px; position: sticky; top: 0; z-index: 100; }

  .header-stats { margin-left: auto; display: flex; gap: 20px; font-size: 12px; }
  .hstat { text-align: right; }
  .hstat-val { font-weight: 700; color: var(--orange2); font-size: 16px; display: block; }
  .hstat-lbl { color: rgba(255,255,255,0.5); }
  .orange-bar { height: 4px; background: var(--orange); }

  /* UPLOAD SCREEN */
  #uploadScreen { max-width: 680px; margin: 60px auto; padding: 0 20px; }
  .upload-hero { text-align: center; margin-bottom: 40px; }
  .upload-hero h2 { font-size: 26px; color: var(--dark); margin-bottom: 8px; }
  .upload-hero p { color: var(--text2); font-size: 15px; }
  .drop-zone { border: 2px dashed var(--gray2); border-radius: 16px; padding: 48px 32px; text-align: center; cursor: pointer; transition: all .2s; background: white; position: relative; margin-bottom: 20px; }
  .drop-zone:hover, .drop-zone.dragover { border-color: var(--orange); background: var(--orange4); transform: scale(1.005); }
  .drop-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
  .dz-icon { font-size: 44px; margin-bottom: 14px; }
  .dz-title { font-weight: 700; font-size: 17px; color: var(--dark); margin-bottom: 6px; }
  .dz-sub { font-size: 13px; color: var(--text2); }
  .btn-process { width: 100%; padding: 16px; background: var(--orange); color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer; transition: background .2s; }
  .btn-process:hover { background: #d44a10; }
  .btn-process:disabled { background: var(--gray2); color: var(--gray3); cursor: not-allowed; }
  .upload-hint { text-align: center; font-size: 12px; color: var(--text2); margin-top: 16px; }
  .progress-bar { height: 4px; background: var(--gray2); border-radius: 2px; overflow: hidden; margin-top: 12px; display: none; }
  .progress-fill { height: 100%; background: var(--orange); border-radius: 2px; transition: width .3s; }
  .file-list { margin-bottom: 20px; display: none; }
  .file-list-header { font-size: 12px; font-weight: 700; color: var(--text2); margin-bottom: 8px; text-transform: uppercase; letter-spacing: .05em; }
  .file-item { display: flex; align-items: center; gap: 10px; background: white; border-radius: 8px; padding: 10px 14px; margin-bottom: 6px; border: 1px solid var(--gray2); font-size: 13px; }
  .file-item-name { flex: 1; color: var(--dark); font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .file-item-size { font-size: 11px; color: var(--text2); flex-shrink: 0; }
  .file-item-x { color: var(--gray3); cursor: pointer; font-size: 18px; flex-shrink: 0; padding: 0 2px; line-height: 1; }
  .file-item-x:hover { color: #e53e3e; }

  /* DASHBOARD */
  #dashboard { display: none; }
  .dash-wrap { max-width: 1400px; margin: 0 auto; padding: 24px 24px; }

  /* METRICS ROW */
  .metrics { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 20px; }
  .metric { background: white; border-radius: 10px; padding: 16px; border-left: 4px solid var(--orange); }
  .metric-val { font-size: 26px; font-weight: 700; color: var(--dark); line-height: 1; }
  .metric-lbl { font-size: 11px; color: var(--text2); margin-top: 5px; }

  /* CHARTS ROW */
  .charts-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .card { background: white; border-radius: 10px; padding: 18px; }
  .card-title { font-size: 13px; font-weight: 700; color: var(--dark); margin-bottom: 14px; border-bottom: 2px solid var(--orange4); padding-bottom: 8px; }
  .chart-wrap { position: relative; }

  /* CAT LIST */
  .cat-row { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; font-size: 12px; }
  .cat-name { flex: 1; color: var(--text2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cat-bar-wrap { width: 80px; height: 6px; background: var(--gray1); border-radius: 3px; flex-shrink: 0; }
  .cat-bar-fill { height: 100%; background: var(--orange); border-radius: 3px; }
  .cat-count { min-width: 28px; text-align: right; font-weight: 700; color: var(--orange); font-size: 12px; }

  /* CITY CHIPS */
  .city-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .city-chip { background: var(--gray1); border-radius: 20px; padding: 4px 10px; font-size: 11px; color: var(--text2); display: flex; gap: 5px; }
  .city-chip strong { color: var(--dark); }

  /* LEAD TABLE SECTION */
  .leads-section { background: white; border-radius: 10px; padding: 18px; margin-bottom: 24px; }
  .leads-header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
  .leads-header h3 { font-size: 14px; font-weight: 700; color: var(--dark); margin-right: auto; }
  .search-box { padding: 7px 12px; border: 1px solid var(--gray2); border-radius: 8px; font-size: 12px; width: 200px; }
  .filter-sel { padding: 7px 10px; border: 1px solid var(--gray2); border-radius: 8px; font-size: 12px; background: white; cursor: pointer; }
  .btn-export { padding: 7px 14px; background: #1D6F42; color: white; border: none; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; white-space: nowrap; display: inline-flex; align-items: center; gap: 5px; }
  .btn-export:hover { background: #155534; }
  .btn-export-cat { background: #217346; }
  .btn-export-cat:hover { background: #1a5c38; }
  .tier-tabs { display: flex; gap: 6px; margin-bottom: 14px; flex-wrap: wrap; }
  .tier-tab { padding: 5px 12px; border-radius: 20px; border: 1px solid var(--gray2); font-size: 11px; cursor: pointer; background: white; color: var(--text2); font-weight: 600; }
  .tier-tab.active { background: var(--dark); color: white; border-color: var(--dark); }
  .results-count { font-size: 11px; color: var(--text2); margin-bottom: 10px; }

  /* TABLE */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  thead th { background: var(--dark); color: white; padding: 9px 10px; text-align: left; font-size: 11px; white-space: nowrap; cursor: pointer; user-select: none; position: sticky; top: 0; }
  thead th:hover { background: var(--dark2); }
  thead th .sort-arrow { opacity: 0.4; margin-left: 3px; }
  thead th.sort-asc .sort-arrow::after { content: ' ▲'; opacity: 1; }
  thead th.sort-desc .sort-arrow::after { content: ' ▼'; opacity: 1; }
  tbody tr:hover { background: var(--orange4) !important; }
  tbody td { padding: 8px 10px; border-bottom: 1px solid var(--gray1); vertical-align: middle; }
  .score-badge { display: inline-block; padding: 3px 8px; border-radius: 12px; font-weight: 700; font-size: 11px; white-space: nowrap; }
  .s100 { background: #F05A1E; color: white; }
  .s90  { background: #FF8C5A; color: white; }
  .s80  { background: #FFBA9A; color: #333; }
  .s70  { background: #FFE5D8; color: #555; }
  .email-link { color: #1a73e8; text-decoration: none; font-size: 11px; }
  .email-link:hover { text-decoration: underline; }
  .reasons-cell { font-size: 10px; color: var(--text2); font-style: italic; max-width: 280px; }
  .reason-tag { display: inline-block; background: var(--gray1); border-radius: 3px; padding: 1px 5px; margin: 1px; font-size: 10px; }
  .reason-tag.hi { background: #E8F5E9; color: #2E7D32; }
  .ds-tag { font-size: 10px; background: var(--gray1); border-radius: 4px; padding: 2px 6px; color: var(--text2); }
  .stars { color: #F5A623; font-size: 11px; }
  .paginator { display: flex; align-items: center; gap: 8px; margin-top: 14px; font-size: 12px; color: var(--text2); }
  .paginator button { padding: 4px 10px; border: 1px solid var(--gray2); border-radius: 6px; background: white; cursor: pointer; font-size: 12px; }
  .paginator button:disabled { opacity: 0.4; cursor: not-allowed; }
  .paginator button:hover:not(:disabled) { background: var(--dark); color: white; border-color: var(--dark); }
  .page-info { margin: 0 8px; }

  /* SCORING GUIDE */
  .guide-card { background: white; border-radius: 10px; padding: 18px; margin-bottom: 24px; }
  .guide-grid { display: grid; grid-template-columns: 2fr 0.4fr 3fr; border: 1px solid var(--gray2); border-radius: 8px; overflow: hidden; }
  .guide-hdr { background: var(--dark); color: white; padding: 8px 12px; font-size: 11px; font-weight: 700; }
  .guide-row { padding: 9px 12px; font-size: 12px; border-top: 1px solid var(--gray1); }
  .guide-row:nth-child(even) { background: var(--cream); }
  .guide-pts { text-align: center; font-weight: 700; color: var(--orange); font-size: 13px; }
  .guide-total { background: var(--dark); color: white; }
  .guide-total .guide-pts { color: var(--orange2); }

  /* FOOTER */
  footer { background: var(--dark); color: rgba(255,255,255,0.4); text-align: center; padding: 16px; font-size: 11px; margin-top: 24px; }

  @media (max-width: 900px) {
    .metrics { grid-template-columns: repeat(3, 1fr); }
    .charts-row { grid-template-columns: 1fr; }

  }
</style>
</head>
<body>

<header>
  <svg width="147" height="24" viewBox="0 0 196 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
    <path d="M44.1427 10.2228C42.7802 8.86025 41.218 8.17896 39.4012 8.17896C35.4821 8.17896 32.3027 11.4168 32.3027 16.1274C32.3027 20.7553 35.6541 24.0482 39.4838 24.0482C41.3866 24.0482 42.8042 23.3669 44.1393 22.0594V23.6491H47.9139V8.57466H44.1393V10.2228H44.1427ZM40.1685 20.5833C37.8115 20.5833 36.1083 18.6805 36.1083 16.0964C36.1083 13.6258 37.6705 11.6405 40.1685 11.6405C42.5531 11.6405 44.3148 13.4297 44.3148 16.0688C44.3148 18.8215 42.498 20.5833 40.1685 20.5833Z" fill="white"/>
    <path d="M59.2442 8.17554C57.5685 8.17554 56.2335 8.88437 54.7883 10.1059V8.57124H51.0137V23.6457H54.7883V17.2284C54.7883 15.6663 54.7608 14.3037 55.5281 13.0822C56.1233 12.1463 57.0317 11.6336 58.0846 11.6336C60.3831 11.6336 60.6412 13.5364 60.6412 16.5162V23.6422H64.4158V13.3437C64.4089 10.1093 62.0554 8.17554 59.2442 8.17554Z" fill="white"/>
    <path d="M73.4653 18.0272L69.5462 8.5752H65.6855L71.4215 22.5141L68.3281 29.1584H72.2163L81.6959 8.5752H77.8077L73.4653 18.0272Z" fill="white"/>
    <path d="M91.3477 8.17548C89.7305 8.17548 88.337 8.85679 86.8918 10.1058V2.75269H83.1172V23.6456H86.8918V17.2284C86.8918 15.6662 86.8333 14.3037 87.6006 13.1131C88.1959 12.1772 89.1043 11.637 90.1572 11.637C92.3731 11.637 92.7413 13.4538 92.7413 16.5196V23.6456H96.5159V13.6809C96.5159 10.0232 94.1864 8.17548 91.3477 8.17548Z" fill="white"/>
    <path d="M106.563 8.17554C101.708 8.17554 98.7285 11.9811 98.7285 16.0964C98.7285 20.5248 101.822 24.0448 106.622 24.0448C109.801 24.0448 111.931 23.0229 113.548 20.7244L110.369 19.2207C109.319 20.2426 108.239 20.6968 106.622 20.6968C104.464 20.6968 102.761 19.4478 102.393 17.2044H114.543C114.543 16.8637 114.57 16.6917 114.57 16.3545C114.567 11.5854 111.332 8.17554 106.563 8.17554ZM102.558 14.2246C103.298 12.3218 104.743 11.3859 106.618 11.3859C108.635 11.3859 110.252 12.4629 110.765 14.2246H102.558Z" fill="white"/>
    <path d="M120.272 2.75659H116.497V23.6495H120.272V2.75659Z" fill="white"/>
    <path d="M131.486 8.17554C129.669 8.17554 128.107 8.85683 126.744 10.2194V8.57124H122.97V29.1545H126.744V22.056C128.107 23.3601 129.497 24.0448 131.4 24.0448C135.233 24.0448 138.612 20.7519 138.612 16.1239C138.612 11.4134 135.374 8.17554 131.486 8.17554ZM130.719 20.5833C128.389 20.5833 126.572 18.794 126.572 16.0689C126.572 13.4297 128.303 11.6405 130.719 11.6405C133.217 11.6405 134.806 13.6293 134.806 16.0964C134.806 18.6805 133.076 20.5833 130.719 20.5833Z" fill="white"/>
    <path d="M149.227 8.17554C147.551 8.17554 146.216 8.88437 144.771 10.1059V8.57124H140.996V23.6457H144.771V17.2284C144.771 15.6663 144.743 14.3037 145.511 13.0822C146.106 12.1463 147.014 11.6336 148.067 11.6336C150.366 11.6336 150.624 13.5364 150.624 16.5162V23.6422H154.398V13.3437C154.391 10.1093 152.038 8.17554 149.227 8.17554Z" fill="#49B951"/>
    <path d="M164.411 8.17554C160.296 8.17554 156.604 11.5545 156.604 16.1239C156.604 20.5523 160.068 24.0448 164.438 24.0448C169.039 24.0448 172.414 20.4663 172.414 16.0964C172.418 11.6405 168.812 8.17554 164.411 8.17554ZM164.469 20.4697C162.026 20.4697 160.409 18.653 160.409 16.0964C160.409 13.5983 162.112 11.754 164.469 11.754C166.94 11.754 168.616 13.5708 168.616 16.1274C168.612 18.7665 166.795 20.4697 164.469 20.4697Z" fill="#49B951"/>
    <path d="M191.608 8.5752L188.569 17.0363L185.362 8.5752H183.091L179.826 17.1498L176.815 8.5752H173.099L178.549 23.6496H180.903L184.227 15.0475L187.434 23.6496H189.846L195.327 8.5752H191.608Z" fill="#49B951"/>
    <path d="M27.8463 13.0782C27.8381 12.93 27.8272 12.7819 27.8135 12.6337C27.8053 12.546 27.7944 12.4582 27.7834 12.3704C27.767 12.2387 27.7533 12.107 27.7342 11.9753C27.7205 11.882 27.7068 11.7915 27.6904 11.701C27.6685 11.5748 27.6466 11.4513 27.6248 11.3251C27.6056 11.2318 27.5892 11.1385 27.57 11.048C27.5427 10.9245 27.5153 10.8038 27.4852 10.6831C27.4634 10.5926 27.4415 10.4993 27.4196 10.4088C27.3868 10.2853 27.3512 10.1619 27.3156 10.0384C27.291 9.95335 27.2691 9.86831 27.2418 9.78326C27.1816 9.58847 27.1159 9.39644 27.0475 9.20714C27.012 9.10837 26.9737 9.01235 26.9354 8.91633C26.8971 8.81756 26.8588 8.71605 26.8177 8.61728C26.8068 8.58984 26.7931 8.56241 26.7822 8.53498L23.7675 11.5583C23.9562 12.3347 24.0602 13.144 24.0602 13.9753C24.0602 19.5665 19.5244 24.118 13.9464 24.118C8.3684 24.118 3.83267 19.5693 3.83267 13.9753C3.83267 9.02605 7.3863 4.89712 12.067 4.01097V8.74074H15.8915V0.137174C15.2541 0.0493827 14.6057 0 13.9464 0C13.309 0 12.6825 0.0466312 12.067 0.128936C11.8591 0.156371 11.6512 0.189288 11.446 0.227697C11.4378 0.230441 11.4296 0.230443 11.4241 0.230443C11.2217 0.268852 11.022 0.310008 10.8223 0.353904C10.8141 0.356647 10.8059 0.356652 10.7977 0.359396C10.598 0.406035 10.3983 0.455415 10.2013 0.510284C10.1986 0.510284 10.1931 0.51303 10.1904 0.51303C8.58178 0.962962 7.09084 1.69547 5.77225 2.65569C5.76131 2.66392 5.7531 2.6694 5.74216 2.67763C5.59717 2.78462 5.45492 2.89162 5.3154 3.0041C5.28804 3.02605 5.26068 3.04801 5.23333 3.06721C5.10475 3.17147 4.97618 3.27846 4.85033 3.3882C4.81477 3.41838 4.77921 3.44854 4.74364 3.48147C4.62601 3.58572 4.50838 3.69272 4.39348 3.79972C4.35244 3.83813 4.31414 3.87653 4.27311 3.91494C4.16368 4.02194 4.05699 4.12893 3.9503 4.23867C3.90927 4.28257 3.86549 4.32647 3.82446 4.37037C3.72324 4.47737 3.62202 4.58709 3.52354 4.69957C3.4825 4.74621 3.43873 4.7956 3.3977 4.84499C3.30195 4.95473 3.2062 5.0672 3.11319 5.18243C3.07215 5.23181 3.03385 5.28394 2.99555 5.33332C2.90528 5.44855 2.81226 5.56652 2.72472 5.68449C2.68916 5.73113 2.65907 5.77778 2.6235 5.82716C2.53323 5.95336 2.44295 6.07956 2.35814 6.20576L2.35541 6.20849C2.16391 6.49381 1.98609 6.78737 1.81648 7.08641C1.78092 7.14677 1.74535 7.20714 1.70979 7.27024C1.65508 7.37175 1.6031 7.47598 1.54839 7.58023C1.50188 7.67077 1.45538 7.75857 1.4116 7.84911C1.36236 7.94787 1.31859 8.04663 1.27208 8.14814C1.22558 8.2469 1.18181 8.34567 1.13804 8.44444C1.097 8.5432 1.05597 8.64197 1.01767 8.74074C0.976633 8.84499 0.932859 8.94923 0.89456 9.05623C0.858996 9.155 0.823433 9.25377 0.787869 9.35253C0.74957 9.46227 0.711273 9.57201 0.67571 9.68175C0.642882 9.78052 0.612789 9.87929 0.585432 9.97806C0.552604 10.0933 0.519776 10.2058 0.486948 10.321C0.459592 10.4198 0.434971 10.5158 0.41035 10.6145C0.380258 10.7325 0.3529 10.8532 0.328279 10.9739C0.306394 11.07 0.287244 11.1687 0.268094 11.2647C0.243473 11.391 0.221588 11.5144 0.199702 11.6406C0.183288 11.7366 0.166875 11.8299 0.153197 11.9259C0.134047 12.0576 0.117632 12.192 0.101218 12.3265C0.0902756 12.417 0.0793343 12.5075 0.0683917 12.5981C0.0547133 12.749 0.0437693 12.8999 0.0328267 13.0507C0.0273553 13.1276 0.0218847 13.2016 0.0164133 13.2785C0.00547066 13.5062 0 13.7366 0 13.9698C0 17.4815 1.29397 20.6886 3.42505 23.1413L0 26.5761V32L6.31392 25.668C8.50519 27.1056 11.1205 27.9451 13.9355 27.9451C21.6336 27.9451 27.871 21.6872 27.871 13.9698C27.871 13.7421 27.8655 13.5171 27.8546 13.2949C27.8573 13.2263 27.8491 13.1523 27.8463 13.0782Z" fill="white"/>
    <path d="M26.8387 8.53033C26.5567 7.8713 26.2222 7.23963 25.8461 6.63803C25.8351 6.61889 25.8213 6.59974 25.8102 6.5806C25.7245 6.44387 25.636 6.30989 25.5448 6.17863C25.5116 6.13215 25.4812 6.08292 25.448 6.03643C25.2379 5.73563 25.0167 5.44303 24.7844 5.16138L13.8966 15.93L8.23701 10.3324L5.50537 13.0341L13.8966 21.3334L23.7891 11.5492L26.8387 8.53033Z" fill="#49B951"/>
  </svg>
  <span style="color:rgba(255,255,255,0.35);font-size:13px;margin-left:4px">· Lead Intelligence</span>
  <button id="btnReset" onclick="resetToUpload()" style="display:none;margin-left:auto;padding:6px 14px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.2);border-radius:6px;font-size:12px;cursor:pointer;margin-right:16px;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">↩ Neue Dateien laden</button>
  <div class="header-stats" id="headerStats" style="display:none">
    <div class="hstat"><span class="hstat-val" id="hTotalLeads">0</span><span class="hstat-lbl">Leads gesamt</span></div>
    <div class="hstat"><span class="hstat-val" id="hHighValue">0</span><span class="hstat-lbl">Hochwertig</span></div>
    <div class="hstat"><span class="hstat-val" id="hNamed">0</span><span class="hstat-lbl">Benannt</span></div>
  </div>
</header>
<div class="orange-bar"></div>

<!-- UPLOAD -->
<div id="uploadScreen">
  <div class="upload-hero">
    <h2>Lead-Dateien importieren</h2>
    <p>Beliebig viele Excel-Dateien auf einmal hochladen &mdash; per Drag &amp; Drop oder Klick zum Ausw&auml;hlen.</p>
  </div>
  <div class="drop-zone" id="mainDropZone"
    ondragover="dzMainDrag(event)" ondragleave="dzMainLeave()" ondrop="dzMainDrop(event)">
    <input type="file" accept=".xlsx,.xls" multiple onchange="filesChosen(event)" id="fileInput">
    <div class="dz-icon">&#128194;</div>
    <div class="dz-title">Dateien hier ablegen oder klicken zum Ausw&auml;hlen</div>
    <div class="dz-sub">Beliebig viele .xlsx-Dateien gleichzeitig &nbsp;&middot;&nbsp; Alle Daten bleiben lokal</div>
  </div>
  <div class="file-list" id="fileList">
    <div class="file-list-header" id="fileListHeader"></div>
    <div id="fileListItems"></div>
  </div>
  <div class="progress-bar" id="progressBar"><div class="progress-fill" id="progressFill" style="width:0%"></div></div>
  <button class="btn-process" id="btnProcess" onclick="processFiles()" disabled>Bericht erstellen</button>
  <p class="upload-hint">Unterst&uuml;tzte Formate: .xlsx &nbsp;&middot;&nbsp; Alle Daten werden lokal im Browser verarbeitet</p>
  <div id="savedBanner" style="display:none;margin-top:16px;background:#E8F5E9;border:1px solid #A5D6A7;border-radius:8px;padding:12px 16px;align-items:center;gap:12px;">
    <span style="font-size:18px">&#128190;</span>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:700;color:#2E7D32">Gespeicherte Sitzung gefunden</div>
      <div style="font-size:11px;color:#555" id="savedInfo"></div>
    </div>
    <button onclick="loadSavedSession()" style="padding:7px 14px;background:#2E7D32;color:white;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">Wiederherstellen</button>
    <button onclick="clearSavedSession()" style="padding:7px 10px;background:none;border:1px solid #ccc;border-radius:8px;font-size:11px;color:#888;cursor:pointer;">L&ouml;schen</button>
  </div>
</div>
</div>

<!-- DASHBOARD -->
<div id="dashboard">
<div class="dash-wrap">

  <!-- KPIs -->
  <div class="metrics">
    <div class="metric"><div class="metric-val" id="kpiTotal">0</div><div class="metric-lbl">Kontakte gesamt</div></div>
    <div class="metric"><div class="metric-val" id="kpiHV">0</div><div class="metric-lbl">Hochwertige Leads (Score ≥ 70)</div></div>
    <div class="metric"><div class="metric-val" id="kpiPerfect">0</div><div class="metric-lbl">Perfekter Score (100)</div></div>
    <div class="metric"><div class="metric-val" id="kpiEmail">0</div><div class="metric-lbl">Mit E-Mail</div></div>
    <div class="metric"><div class="metric-val" id="kpiNamed">0</div><div class="metric-lbl">Benannte Kontakte</div></div>
  </div>

  <!-- CHARTS -->
  <div class="charts-row">
    <div class="card">
      <div class="card-title">Top-Kategorien</div>
      <div id="catList"></div>
    </div>
    <div class="card">
      <div class="card-title">Google-Bewertungen</div>
      <div class="chart-wrap" style="height:200px"><canvas id="ratingsChart" role="img" aria-label="Bewertungsverteilung"></canvas></div>
      <div style="margin-top:10px">
        <div class="card-title" style="margin-top:8px">Geschlecht / Anrede</div>
        <div class="chart-wrap" style="height:150px"><canvas id="genderChart" role="img" aria-label="Geschlechterverteilung"></canvas></div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Top-Städte</div>
      <div class="city-chips" id="cityChips"></div>
      <div style="margin-top:16px">
        <div class="card-title">Score-Verteilung</div>
        <div class="chart-wrap" style="height:160px"><canvas id="scoreChart" role="img" aria-label="Score-Verteilung"></canvas></div>
      </div>
    </div>
  </div>

  <!-- LEAD TABLE -->
  <div class="leads-section">
    <div class="leads-header">
      <h3>Hochwertige Leads</h3>
      <input class="search-box" type="text" id="searchBox" placeholder="Name, Firma, Stadt suchen…" oninput="applyFilters()">
      <select class="filter-sel" id="catFilter" onchange="applyFilters()">
        <option value="">Alle Kategorien</option>
      </select>
      <select class="filter-sel" id="dsFilter" onchange="applyFilters()">
        <option value="">Alle Datensätze</option>
      </select>
      <select class="filter-sel" id="genderFilter" onchange="applyFilters()">
        <option value="">Anrede: alle</option>
        <option value="Frau">Frau</option>
        <option value="Herr">Herr</option>
      </select>
      <button class="btn-export" onclick="exportExcel()"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Excel &ndash; Aktuelle Ansicht</button>
      <button class="btn-export btn-export-cat" onclick="exportByCategory()"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Excel &ndash; Nach Kategorie</button>
    </div>
    <div class="tier-tabs">
      <div class="tier-tab active" onclick="setTier(0,this)">Alle (≥70)</div>
      <div class="tier-tab" onclick="setTier(100,this)">Perfekt (100)</div>
      <div class="tier-tab" onclick="setTier(90,this)">Score 90–99</div>
      <div class="tier-tab" onclick="setTier(80,this)">Score 80–89</div>
      <div class="tier-tab" onclick="setTier(70,this)">Score 70–79</div>
    </div>
    <div class="results-count" id="resultsCount"></div>
    <div class="table-wrap">
      <table id="leadsTable">
        <thead>
          <tr>
            <th onclick="sortBy('score')" class="sort-desc">Score<span class="sort-arrow"></span></th>
            <th onclick="sortBy('gender')">Anrede<span class="sort-arrow"></span></th>
            <th onclick="sortBy('first_name')">Vorname<span class="sort-arrow"></span></th>
            <th onclick="sortBy('last_name')">Nachname<span class="sort-arrow"></span></th>
            <th onclick="sortBy('company')">Unternehmen<span class="sort-arrow"></span></th>
            <th onclick="sortBy('category')">Kategorie<span class="sort-arrow"></span></th>
            <th onclick="sortBy('city')">Stadt<span class="sort-arrow"></span></th>
            <th>E-Mail</th>
            <th onclick="sortBy('phone')">Telefon<span class="sort-arrow"></span></th>
            <th onclick="sortBy('rating_score')">Bewertung<span class="sort-arrow"></span></th>
            <th>Warum wertvoll</th>
            <th onclick="sortBy('dataset')">Datensatz<span class="sort-arrow"></span></th>
          </tr>
        </thead>
        <tbody id="leadsBody"></tbody>
      </table>
    </div>
    <div class="paginator">
      <button id="btnPrev" onclick="changePage(-1)">‹ Zurück</button>
      <span class="page-info" id="pageInfo"></span>
      <button id="btnNext" onclick="changePage(1)">Weiter ›</button>
    </div>
  </div>

  <!-- SCORING GUIDE -->
  <div class="guide-card">
    <div class="card-title">Bewertungsmethodik — wie der Score berechnet wird</div>
    <div class="guide-grid">
      <div class="guide-hdr">Signal</div>
      <div class="guide-hdr" style="text-align:center">Punkte</div>
      <div class="guide-hdr">Warum relevant</div>
      <div class="guide-row">Benannter Kontakt</div><div class="guide-row guide-pts">30</div><div class="guide-row">Ermöglicht persönliche Ansprache (z.B. „Hallo Andrea") — 2–3× höhere Öffnungsrate</div>
      <div class="guide-row">Anrede bekannt (Frau/Herr)</div><div class="guide-row guide-pts">10</div><div class="guide-row">In der deutschen Geschäftskultur essenziell — falsche Anrede schadet der Glaubwürdigkeit</div>
      <div class="guide-row">E-Mail-Adresse</div><div class="guide-row guide-pts">20</div><div class="guide-row">Hauptkanal für die Kontaktaufnahme — ohne E-Mail ist der Lead nicht nutzbar</div>
      <div class="guide-row">Telefonnummer</div><div class="guide-row guide-pts">10</div><div class="guide-row">Ermöglicht Nachfass-Anruf oder WhatsApp-Kontakt; direkterer Kanal als E-Mail</div>
      <div class="guide-row">Website</div><div class="guide-row guide-pts">5</div><div class="guide-row">Bestätigt ein aktives Unternehmen; nützlich für personalisierte Ansprache</div>
      <div class="guide-row">Bewertung 4,8–5,0 ★</div><div class="guide-row guide-pts">15</div><div class="guide-row">Top-bewertete Unternehmen sind aktiv und haben Budget</div>
      <div class="guide-row">Bewertung 4,5–4,9 ★</div><div class="guide-row guide-pts">10</div><div class="guide-row">Hochwertiges Unternehmen mit starkem Kundenstamm</div>
      <div class="guide-row">Bewertung 4,0–4,4 ★</div><div class="guide-row guide-pts">5</div><div class="guide-row">Solides, wahrscheinlich etabliertes Unternehmen</div>
      <div class="guide-row">50+ Google-Rezensionen</div><div class="guide-row guide-pts">10</div><div class="guide-row">Etablierter Kundenstamm — echte Marktpräsenz nachgewiesen</div>
      <div class="guide-row">20–49 Rezensionen</div><div class="guide-row guide-pts">5</div><div class="guide-row">Wachsendes oder auf eine Nische spezialisiertes Unternehmen</div>
      <div class="guide-row">5–19 Rezensionen</div><div class="guide-row guide-pts">2</div><div class="guide-row">Aktives Unternehmen mit ersten nachweisbaren Ergebnissen</div>
      <div class="guide-row guide-total" style="font-weight:700">Maximaler Score</div><div class="guide-row guide-pts guide-total" style="font-weight:700;font-size:15px">100</div><div class="guide-row guide-total">Alle Kriterien erfüllt: Kontakt + Anrede + E-Mail + Telefon + Website + 5★ + 50+ Rezensionen</div>
    </div>
  </div>

</div><!-- /dash-wrap -->
</div><!-- /dashboard -->

<footer>anyhelpnow Lead Intelligence &nbsp;·&nbsp; Alle Daten werden lokal im Browser verarbeitet — kein Upload auf externe Server</footer>

<script>
// ── FILE HANDLING ─────────────────────────────────────────────────
let loadedFiles = [];

function dzMainDrag(e) { e.preventDefault(); document.getElementById('mainDropZone').classList.add('dragover'); }
function dzMainLeave() { document.getElementById('mainDropZone').classList.remove('dragover'); }
function dzMainDrop(e) {
  e.preventDefault(); dzMainLeave();
  addFiles(Array.from(e.dataTransfer.files).filter(f => /\.xlsx?$/i.test(f.name)));
}
function filesChosen(e) {
  addFiles(Array.from(e.target.files).filter(f => /\.xlsx?$/i.test(f.name)));
  e.target.value = '';
}
function addFiles(newFiles) {
  newFiles.forEach(f => { if (!loadedFiles.find(x => x.name === f.name)) loadedFiles.push(f); });
  renderFileList();
  document.getElementById('btnProcess').disabled = loadedFiles.length === 0;
}
function removeFile(idx) {
  loadedFiles.splice(idx, 1);
  renderFileList();
  document.getElementById('btnProcess').disabled = loadedFiles.length === 0;
}
function renderFileList() {
  const list = document.getElementById('fileList');
  if (!loadedFiles.length) { list.style.display = 'none'; return; }
  list.style.display = 'block';
  document.getElementById('fileListHeader').textContent =
    loadedFiles.length + (loadedFiles.length === 1 ? ' Datei geladen' : ' Dateien geladen');
  document.getElementById('fileListItems').innerHTML = loadedFiles.map((f, i) => {
    const sz = f.size > 1048576 ? (f.size/1048576).toFixed(1)+' MB' : Math.round(f.size/1024)+' KB';
    return '<div class="file-item">' +
      '<span style="font-size:15px;flex-shrink:0">&#128196;</span>' +
      '<span class="file-item-name" title="'+esc(f.name)+'">'+esc(f.name)+'</span>' +
      '<span class="file-item-size">'+sz+'</span>' +
      '<span class="file-item-x" onclick="removeFile('+i+')" title="Entfernen">&times;</span>' +
    '</div>';
  }).join('');
}

// ── EXCEL PARSING ─────────────────────────────────────────────────
function readXlsx(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const wb = XLSX.read(e.target.result, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
      resolve(data);
    };
    reader.readAsBinaryString(file);
  });
}

function parseRating(r) {
  if (!r) return [null, null];
  const m = String(r).match(/([\d.]+)\s*\((\d+)/);
  if (m) return [parseFloat(m[1]), parseInt(m[2])];
  return [null, null];
}

function normalizeRow(row, dataset) {
  // Find fields by trying multiple possible column names
  const get = (...keys) => { for(const k of keys) { if(row[k] !== undefined && row[k] !== '') return String(row[k]).trim(); } return ''; };
  const company    = get('company','Unternehmen','Company');
  const firstName  = get('first_name','Vorname','FirstName');
  const lastName   = get('last_name','Nachname','LastName');
  const email      = get('email','Email','E-Mail');
  const phone      = get('phone','Telefon','Phone','phone_e164');
  const website    = get('website','Website');
  const city       = get('city','Stadt','City');
  const category   = get('category','Kategorie','Category');
  const anrede     = get('Anrede','anrede','salutation','Salutation','gender');
  const ratings    = get('ratings','Ratings','Bewertung');
  const [rScore, rCount] = parseRating(ratings);
  const gender = anrede.startsWith('Frau') ? 'Frau' : anrede.startsWith('Herr') ? 'Herr' : '';
  return { company, first_name: firstName, last_name: lastName, email, phone, website, city, category, gender, rating_score: rScore, rating_count: rCount, dataset };
}

// ── SCORING ───────────────────────────────────────────────────────
function scoreLead(r) {
  let s = 0; const pts = [];
  if (r.first_name) { s += 30; pts.push({ label: 'Benannter Kontakt', hi: true }); }
  if (r.gender)     { s += 10; pts.push({ label: 'Anrede bekannt', hi: false }); }
  if (r.email)      { s += 20; pts.push({ label: 'E-Mail', hi: false }); }
  if (r.phone)      { s += 10; pts.push({ label: 'Telefon', hi: false }); }
  if (r.website)    { s +=  5; pts.push({ label: 'Website', hi: false }); }
  const rs = r.rating_score, rc = r.rating_count;
  if (rs >= 4.8)      { s += 15; pts.push({ label: 'Top-Bewertung ' + rs.toFixed(1) + '★', hi: true }); }
  else if (rs >= 4.5) { s += 10; pts.push({ label: 'Hohe Bewertung ' + rs.toFixed(1) + '★', hi: false }); }
  else if (rs >= 4.0) { s +=  5; pts.push({ label: 'Gute Bewertung ' + rs.toFixed(1) + '★', hi: false }); }
  if (rc >= 50)       { s += 10; pts.push({ label: rc + ' Rezensionen', hi: true }); }
  else if (rc >= 20)  { s +=  5; pts.push({ label: rc + ' Rezensionen', hi: false }); }
  else if (rc >= 5)   { s +=  2; pts.push({ label: rc + ' Rezensionen', hi: false }); }
  return { ...r, score: s, reasons: pts };
}

// ── STATE ─────────────────────────────────────────────────────────
let allLeads = [], filteredLeads = [], sortField = 'score', sortDir = -1;
let currentPage = 1, perPage = 50, minTier = 70, maxTier = 100;
let ratingsChart = null, genderChart = null, scoreChart = null;

// ── PROCESS ───────────────────────────────────────────────────────
async function processFiles() {
  const pb = document.getElementById('progressBar');
  const pf = document.getElementById('progressFill');
  pb.style.display = 'block';
  document.getElementById('btnProcess').disabled = true;

  const fileList = loadedFiles.slice();
  let rows = [];
  for (let i = 0; i < fileList.length; i++) {
    pf.style.width = Math.round((i / fileList.length) * 80) + '%';
    const data = await readXlsx(fileList[i]);
    const ds = fileList[i].name.replace(/\.xlsx?$/i,'');
    data.forEach(r => rows.push(normalizeRow(r, ds)));
  }
  pf.style.width = '90%';

  allLeads = rows.map(r => scoreLead(r)).filter(r => r.email || r.phone);
  allLeads.sort((a, b) => b.score - a.score);

  // Save to localStorage for session persistence
  try {
    const snapshot = {
      leads: allLeads,
      savedAt: new Date().toISOString(),
      fileNames: loadedFiles.map(f => f.name)
    };
    localStorage.setItem('anyhelpnow_leads', JSON.stringify(snapshot));
  } catch(e) { console.warn('Could not save session:', e); }

  pf.style.width = '100%';
  setTimeout(() => {
    document.getElementById('uploadScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('headerStats').style.display = 'flex';
    document.getElementById('btnReset').style.display = 'block';
    renderDashboard();
  }, 300);
}

// ── RENDER DASHBOARD ──────────────────────────────────────────────
function renderDashboard() {
  const hvLeads = allLeads.filter(l => l.score >= 70);
  const total = allLeads.length;
  const hv = hvLeads.length;
  const perfect = allLeads.filter(l => l.score === 100).length;
  const withEmail = allLeads.filter(l => l.email).length;
  const named = allLeads.filter(l => l.first_name).length;

  document.getElementById('kpiTotal').textContent = total.toLocaleString('de-DE');
  document.getElementById('kpiHV').textContent = hv.toLocaleString('de-DE');
  document.getElementById('kpiPerfect').textContent = perfect.toLocaleString('de-DE');
  document.getElementById('kpiEmail').textContent = withEmail.toLocaleString('de-DE');
  document.getElementById('kpiNamed').textContent = named.toLocaleString('de-DE');
  document.getElementById('hTotalLeads').textContent = total.toLocaleString('de-DE');
  document.getElementById('hHighValue').textContent = hv.toLocaleString('de-DE');
  document.getElementById('hNamed').textContent = named.toLocaleString('de-DE');

  // Category list
  const catCount = {};
  allLeads.forEach(l => { if(l.category) catCount[l.category] = (catCount[l.category]||0)+1; });
  const topCats = Object.entries(catCount).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const maxCat = topCats[0]?.[1] || 1;
  document.getElementById('catList').innerHTML = topCats.map(([cat,cnt]) =>
    `<div class="cat-row"><span class="cat-name">${cat}</span><div class="cat-bar-wrap"><div class="cat-bar-fill" style="width:${Math.round(cnt/maxCat*100)}%"></div></div><span class="cat-count">${cnt}</span></div>`
  ).join('');

  // City chips
  const cityCount = {};
  allLeads.forEach(l => { if(l.city) cityCount[l.city] = (cityCount[l.city]||0)+1; });
  const topCities = Object.entries(cityCount).sort((a,b)=>b[1]-a[1]).slice(0,14);
  document.getElementById('cityChips').innerHTML = topCities.map(([c,n]) =>
    `<div class="city-chip">${c} <strong>${n}</strong></div>`
  ).join('');

  // Ratings chart
  const rated = allLeads.filter(l => l.rating_score > 0);
  const rBins = [0,0,0,0,0];
  rated.forEach(l => {
    if(l.rating_score >= 5.0) rBins[0]++;
    else if(l.rating_score >= 4.5) rBins[1]++;
    else if(l.rating_score >= 4.0) rBins[2]++;
    else if(l.rating_score >= 3.0) rBins[3]++;
    else rBins[4]++;
  });
  if(ratingsChart) ratingsChart.destroy();
  ratingsChart = new Chart(document.getElementById('ratingsChart'), {
    type: 'bar',
    data: { labels: ['5,0★','4,5–4,9','4,0–4,4','3,0–3,9','< 3,0'],
      datasets:[{ data: rBins, backgroundColor:['#1D9E75','#5DCAA5','#9FE1CB','#FAC775','#F09595'], borderRadius:4, borderSkipped:false }] },
    options: { responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{ x:{grid:{display:false},ticks:{font:{size:10}}}, y:{grid:{color:'#f0f0f0'},ticks:{font:{size:10}},beginAtZero:true} } }
  });

  // Gender chart
  const frau = allLeads.filter(l=>l.gender==='Frau').length;
  const herr = allLeads.filter(l=>l.gender==='Herr').length;
  const unk  = allLeads.length - frau - herr;
  if(genderChart) genderChart.destroy();
  genderChart = new Chart(document.getElementById('genderChart'), {
    type:'doughnut',
    data:{ labels:[`Frau (${frau})`,`Herr (${herr})`,`Unbekannt (${unk})`],
      datasets:[{ data:[frau,herr,unk], backgroundColor:['#D4537E','#378ADD','#B4B2A9'], borderWidth:0 }] },
    options:{ responsive:true, maintainAspectRatio:false, cutout:'60%',
      plugins:{legend:{position:'bottom',labels:{font:{size:10},boxWidth:10,padding:6}}} }
  });

  // Score distribution chart
  const sBins = { '100':0, '90-99':0, '80-89':0, '70-79':0, '< 70':0 };
  allLeads.forEach(l=>{
    if(l.score===100) sBins['100']++;
    else if(l.score>=90) sBins['90-99']++;
    else if(l.score>=80) sBins['80-89']++;
    else if(l.score>=70) sBins['70-79']++;
    else sBins['< 70']++;
  });
  if(scoreChart) scoreChart.destroy();
  scoreChart = new Chart(document.getElementById('scoreChart'), {
    type:'bar',
    data:{ labels:Object.keys(sBins),
      datasets:[{ data:Object.values(sBins), backgroundColor:['#F05A1E','#FF8C5A','#FFBA9A','#FFE5D8','#E0E0E0'], borderRadius:4, borderSkipped:false }] },
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{ x:{grid:{display:false},ticks:{font:{size:10}}}, y:{grid:{color:'#f0f0f0'},ticks:{font:{size:10}},beginAtZero:true} } }
  });

  // Populate filter dropdowns
  const cats = [...new Set(allLeads.map(l=>l.category).filter(Boolean))].sort();
  const catSel = document.getElementById('catFilter');
  catSel.innerHTML = '<option value="">Alle Kategorien</option>' + cats.map(c=>`<option>${c}</option>`).join('');
  const dss = [...new Set(allLeads.map(l=>l.dataset).filter(Boolean))].sort();
  const dsSel = document.getElementById('dsFilter');
  dsSel.innerHTML = '<option value="">Alle Datensätze</option>' + dss.map(d=>`<option>${d}</option>`).join('');

  applyFilters();
}

// ── TABLE FILTERS & SORT ──────────────────────────────────────────
function setTier(min, el) {
  document.querySelectorAll('.tier-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  if(min === 0) { minTier=70; maxTier=100; }
  else if(min===100) { minTier=100; maxTier=100; }
  else { minTier=min; maxTier=min+9; }
  currentPage=1; applyFilters();
}

function applyFilters() {
  const q = document.getElementById('searchBox').value.toLowerCase();
  const cat = document.getElementById('catFilter').value;
  const ds = document.getElementById('dsFilter').value;
  const gf = document.getElementById('genderFilter').value;
  filteredLeads = allLeads.filter(l =>
    l.score >= minTier && l.score <= maxTier &&
    (!cat || l.category === cat) &&
    (!ds  || l.dataset === ds) &&
    (!gf  || l.gender === gf) &&
    (!q   || [l.first_name,l.last_name,l.company,l.city,l.email].join(' ').toLowerCase().includes(q))
  );
  // Sort
  filteredLeads.sort((a,b) => {
    const av = a[sortField]||'', bv = b[sortField]||'';
    if(typeof av === 'number') return sortDir*(av-bv);
    return sortDir*String(av).localeCompare(String(bv),'de');
  });
  currentPage=1; renderTable();
}

let sortCols = {};
function sortBy(field) {
  if(sortField===field) sortDir *= -1; else { sortField=field; sortDir=-1; }
  document.querySelectorAll('thead th').forEach(th=>{th.classList.remove('sort-asc','sort-desc');});
  const ths = document.querySelectorAll('thead th');
  const fieldMap = ['score','gender','first_name','last_name','company','category','city','_email','phone','rating_score','_reasons','dataset'];
  const idx = fieldMap.indexOf(field);
  if(idx>=0) ths[idx].classList.add(sortDir===1?'sort-asc':'sort-desc');
  applyFilters();
}

function scoreBadge(s) {
  if(s===100) return `<span class="score-badge s100">${s}</span>`;
  if(s>=90)   return `<span class="score-badge s90">${s}</span>`;
  if(s>=80)   return `<span class="score-badge s80">${s}</span>`;
  return              `<span class="score-badge s70">${s}</span>`;
}

function renderTable() {
  const start=(currentPage-1)*perPage, end=start+perPage;
  const page=filteredLeads.slice(start,end);
  document.getElementById('resultsCount').textContent =
    `${filteredLeads.length.toLocaleString('de-DE')} Leads gefunden`;

  document.getElementById('leadsBody').innerHTML = page.map(l => {
    const reasons = l.reasons.map(r=>
      `<span class="reason-tag${r.hi?' hi':''}">${r.label}</span>`).join('');
    const stars = l.rating_score > 0 ? `<span class="stars">${l.rating_score.toFixed(1).replace('.',',')}★</span>${l.rating_count?` <small>(${l.rating_count})</small>`:''}` : '';
    return `<tr>
      <td>${scoreBadge(l.score)}</td>
      <td>${l.gender||''}</td>
      <td>${esc(l.first_name)}</td>
      <td>${esc(l.last_name)}</td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${esc(l.company)}">${esc(l.company)}</td>
      <td><small>${esc(l.category)}</small></td>
      <td>${esc(l.city)}</td>
      <td><a class="email-link" href="mailto:${esc(l.email)}">${esc(l.email)}</a></td>
      <td><small>${esc(l.phone)}</small></td>
      <td>${stars}</td>
      <td class="reasons-cell">${reasons}</td>
      <td><span class="ds-tag">${esc(l.dataset)}</span></td>
    </tr>`;
  }).join('');

  const totalPages = Math.ceil(filteredLeads.length/perPage);
  document.getElementById('pageInfo').textContent =
    `Seite ${currentPage} von ${totalPages||1}`;
  document.getElementById('btnPrev').disabled = currentPage<=1;
  document.getElementById('btnNext').disabled = currentPage>=totalPages;
}

function changePage(d) { currentPage+=d; renderTable(); }
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ── EXCEL EXPORT ──────────────────────────────────────────────────
function exportExcel() {
  const headers = ['Score','Stufe','Anrede','Vorname','Nachname','Unternehmen','Kategorie','Stadt','E-Mail','Telefon','Bewertung','Rezensionen','Warum wertvoll','Datensatz'];
  const tierLabel = s => s===100?'Perfekt':s>=90?'Ausgezeichnet':s>=80?'Stark':'Gut';
  const safeR = rs => { if(!rs||rs==='null') return ''; const n=parseFloat(rs); return isNaN(n)?'':n.toFixed(1).replace('.',',')+'★'; };
  const safeRsn = rr => { if(!rr) return ''; if(!Array.isArray(rr)) return String(rr); return rr.map(r=>(r&&r.label)?r.label:String(r)).join(' | '); };
  const rows = filteredLeads.map(l => [
    l.score||0, tierLabel(l.score||0), l.gender||'', l.first_name||'', l.last_name||'',
    l.company||'', l.category||'', l.city||'', l.email||'', l.phone||'',
    safeR(l.rating_score), l.rating_count||'', safeRsn(l.reasons), l.dataset||''
  ]);
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws['!cols'] = [8,14,10,14,16,38,22,18,32,18,10,12,55,22].map(w=>({wch:w}));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Hochwertige Leads');
  XLSX.writeFile(wb, `anyhelpnow_leads_${new Date().toISOString().slice(0,10)}.xlsx`);
}
// ── CATEGORY EXPORT ──────────────────────────────────────────────
function exportByCategory() {
  if (!allLeads || allLeads.length === 0) { alert('Bitte zuerst Dateien laden und Bericht erstellen.'); return; }

  const headers = ['Score','Stufe','Anrede','Vorname','Nachname','Unternehmen','Kategorie','Stadt','E-Mail','Telefon','Bewertung','Rezensionen','Warum wertvoll','Datensatz'];
  const colWidths = [8,14,10,14,16,38,22,18,32,18,10,12,55,22].map(w=>({wch:w}));
  const tierLabel = s => s===100?'Perfekt':s>=90?'Ausgezeichnet':s>=80?'Stark':'Gut';

  // Safe helpers — handles localStorage roundtrip where objects lose their methods
  const safeRating = rs => {
    if (!rs || rs === 'null') return '';
    const n = parseFloat(rs);
    return isNaN(n) ? '' : n.toFixed(1).replace('.', ',') + '★';
  };
  const safeReasons = reasons => {
    if (!reasons) return '';
    if (!Array.isArray(reasons)) return String(reasons);
    return reasons.map(r => (r && r.label) ? r.label : String(r)).join(' | ');
  };

  const toRow = l => [
    l.score || 0,
    tierLabel(l.score || 0),
    l.gender || '',
    l.first_name || '',
    l.last_name || '',
    l.company || '',
    l.category || '',
    l.city || '',
    l.email || '',
    l.phone || '',
    safeRating(l.rating_score),
    l.rating_count || '',
    safeReasons(l.reasons),
    l.dataset || ''
  ];

  // Group all leads by category
  const catMap = {};
  allLeads.forEach(l => {
    const cat = (l.category || 'Sonstige').trim();
    if (!catMap[cat]) catMap[cat] = [];
    catMap[cat].push(l);
  });

  const sortedCats = Object.keys(catMap).sort((a, b) => a.localeCompare(b, 'de'));
  const wb = XLSX.utils.book_new();

  // Tab 1: Summary overview
  const summaryRows = [
    ['Kategorie', 'Leads gesamt', 'Davon benannt', 'Davon Frau', 'Davon Herr', 'Ø Score'],
    ...sortedCats.map(cat => {
      const leads = catMap[cat];
      const named = leads.filter(l => l.first_name).length;
      const frau  = leads.filter(l => l.gender === 'Frau').length;
      const herr  = leads.filter(l => l.gender === 'Herr').length;
      const scores = leads.map(l => l.score || 0);
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return [cat, leads.length, named, frau, herr, avg];
    })
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows);
  wsSummary['!cols'] = [40, 14, 14, 12, 12, 10].map(w => ({wch: w}));
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Uebersicht');

  // One tab per category
  sortedCats.forEach(cat => {
    const rows = catMap[cat].slice().sort((a, b) => (b.score||0) - (a.score||0)).map(toRow);
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws['!cols'] = colWidths;
    // Excel sheet name: max 31 chars, no special chars that break Excel
    let name = cat.replace(/[:\/?*\[\]]/g, '').trim();
    if (name.length > 31) name = name.slice(0, 28) + '...';
    if (!name) name = 'Sonstige';
    XLSX.utils.book_append_sheet(wb, ws, name);
  });

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, 'anyhelpnow_nach_kategorie_' + date + '.xlsx');
}


// ── SESSION PERSISTENCE ───────────────────────────────────────────
function checkSavedSession() {
  try {
    const raw = localStorage.getItem('anyhelpnow_leads');
    if (!raw) return;
    const snap = JSON.parse(raw);
    if (!snap.leads || snap.leads.length === 0) return;
    const d = new Date(snap.savedAt);
    const dateStr = d.toLocaleDateString('de-DE', { day:'2-digit', month:'2-digit', year:'numeric' });
    const timeStr = d.toLocaleTimeString('de-DE', { hour:'2-digit', minute:'2-digit' });
    const names = (snap.fileNames || []).join(', ');
    document.getElementById('savedInfo').textContent =
      snap.leads.length.toLocaleString('de-DE') + ' Leads · Gespeichert am ' + dateStr + ' um ' + timeStr + (names ? ' · ' + names : '');
    document.getElementById('savedBanner').style.display = 'flex';
  } catch(e) {}
}

function loadSavedSession() {
  try {
    const raw = localStorage.getItem('anyhelpnow_leads');
    const snap = JSON.parse(raw);
    allLeads = snap.leads;
    document.getElementById('uploadScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('headerStats').style.display = 'flex';
    document.getElementById('btnReset').style.display = 'block';
    renderDashboard();
  } catch(e) { alert('Sitzung konnte nicht geladen werden.'); }
}

function clearSavedSession() {
  localStorage.removeItem('anyhelpnow_leads');
  document.getElementById('savedBanner').style.display = 'none';
}

function resetToUpload() {
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('headerStats').style.display = 'none';
  document.getElementById('btnReset').style.display = 'none';
  document.getElementById('uploadScreen').style.display = 'block';
  loadedFiles = [];
  renderFileList();
  document.getElementById('btnProcess').disabled = true;
  checkSavedSession();
}

// Auto-check for saved session on load
window.addEventListener('load', checkSavedSession);
</script>
</body>
</html>
`
