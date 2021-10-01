
function GazzetGenerator() {
    const htmls = {
        courseRow: (data, classes) => {
            return `
                <div class="course-row ${classes}">
                    <div class="course-row-left">
                        <table>
                            <tr>
                                <td colspan="7">${data.left.text}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="course-row-main"></div>
                </div>
            `;
        },
        courseCol: (data, classes, header=false) => {
            return `
                <div class="course-col ${classes}">
                    <table>
                        ${header ? 
                            `<tr>
                                <td colspan="7">${data.code}</td>
                            </tr>
                            <tr>
                                <td width="20%">${data.marksMax1 ? data.marksMax1 + "/" + data.marksMin1 : ""}</td>
                                <td width="20%">${data.marksMax2 ? data.marksMax2 + "/" + data.marksMin2 : ""}</td>
                                <td width="20%">${data.marksTotal}</td>
                                <td width="10%">${data.c}</td>
                                <td width="10%">${data.g}</td>
                                <td width="10%">${data.gp}</td>
                                <td style="padding-right: 5px" width="10%">${data.cgp}</td>
                            </tr>`
                        : `
                            <tr>
                                <td width="20%">${data.marks1 ? data.marks1 + "(" + data.grade1 + ")" : ""}</td>
                                <td width="20%">${data.marks2 ? data.marks2 + "(" + data.grade2 + ")" : ""}</td>
                                <td width="20%">${data.marksTotal}</td>
                                <td width="10%">${data.c}</td>
                                <td width="10%">${data.g}</td>
                                <td width="10%">${data.gp}</td>
                                <td style="padding-right: 5px" width="10%">${data.cgp}</td>
                            </tr>
                        `}
                    </table>
                </div>
            `;
        },
        block: (student) => {
            return `
                <div class="block">
                    <div class="block-header">
                        <table style="text-align: left; margin-left: 80px;">
                            <tr>
                                <td width="50px">PRN No: </td>
                                <td width="70px">${student.prn_no}</td>
                                <td width="50px">Seat No: </td>
                                <td width="70px">${student.seat_no}</td>
                                <td width="40px">Name:</td>
                                <td>${student.name}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="block-content">
                        <div class="left"></div>
                        <div class="right"></div>
                    </div>
                    <div class="block-footer"></div>
                </div>
            `;
        },
        backlog: (bl) => {
            if (!bl || Object.keys(bl).length < 1) {
                return;
            }
            const $table = $('<table class="vertical-table"></table>');
            Object.keys(bl).forEach(key => {
                const $tr = $("<tr></tr>");
                $tr.append($(`<td class="headtd">${key.toUpperCase()}</td>`));
                bl[key].forEach(item => {
                    $tr.append($(`<td class="headtd">${item.sem}</td>`));
                    $tr.append($(`<td>${item.value}</td>`));
                });
                $table.append($tr);
            });
            return $table;
        },
        courseRowsTotalCol: (data) => {
            return `
                <div style="text-align: right;">${data.CGPI}</div>
                <div class="total-col-bottom">
                    <div>${data.totalC}</div>
                    <div>${data.totalCG}</div>
                    <div>${data.GPA}</div>
                    <div>${data.total}</div>
                </div>
            `;
        },
        pageHeader: (title) => {
            return `
                <p style="position: absolute; right:0;">Code No. 010</p>
                <p>Anjuman-I-Islam's</p>
                <p style="font-size: 18px; font-weight: 600;">M.H. SABOO SIDDIK COLLEGE OF ENGINEERING</p>
                <P style="font-weight: 600;">8, Saboo Siddik Polytechnic Road, Byculla, Mumbai-400008</P>
                <P style="font-size: 16px; margin-top: 6px;">(Affiliated to University of Mumbai)</P>
                <P style="font-size: 16px; margin-top: 4px; font-weight: 600;">${title}</P>
            `;
        },
        pageFooter: (courses) => {
            let coursesHtml = "";
            courses.forEach(item => {
                coursesHtml += `<div><strong>${item.code}:</strong> ${item.name}</div>`;
            });
            return `
                <div class="footer-top">
                    <div class="footer-left">
                        <p>/ - FEMALE , # - O.229 ,@ - O.5042-A , O.5043-A,O.5044-A,* - O.5045-A , ADC - ADMISSION CANCELLED , RR - RESERVED , - : Fails in Theory or Practical</p>
                        <p>RPV - PROVISIONAL , NCC,RCC - Null & Void Copy Case O.5050 , A,ABS - ABSENT , F - FAILS , P - PASSES , NTW-Null & Void Termwork , G:grade , GP:gradepoints , ~:Dyslexia</p>
                        <div class="footer-fullform-box">
                            <div>C : Credits</div>
                            <div>CP : Credit Points</div>
                            <div>&#8721;CG : Sum of product of Credits & Grad</div>
                            <div>&#8721;C : Sum of Credit Points</div>
                            <div>GPA : &#8721;CG / &#8721;C</div>
                        </div>
                        <table class="footer-marks-table">
                            <tr>
                                <td> % MARKS </td><td> >= 80 </td><td> >=75 and <80 </td><td> >=70 and <75 </td><td> >=60 and <70 </td><td> >=50 and <60 </td><td> >=45 and <50 </td><td> >=40 and <45 </td><td> <40 </td>
                            </tr>
                            <tr>
                                <td>GRADE</td><td>O</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>P</td><td>F</td>
                            </tr>
                            <tr>
                                <td>GRADE POINTS</td><td>10</td><td>9</td><td>8</td><td>7</td><td>6</td><td>5</td><td>4</td><td>0</td>
                            </tr>
                        </table>
                    </div>
                    <div class="footer-right">${coursesHtml}</div>
                </div>
                <div class="footer-bottom">
                    <div>Prepared by: <span class="line"></span></div>
                    <div>Checked by: <span class="line"></span></div>
                    <div>Date: <span class="line"></span></div>
                    <div>Place: Mumbai</div>
                    <div>INCHARGE EXAMINATIONS</div>
                    <div>PRINCIPAL</div>
                </div>
            `;
        },
        page: (student, pageCount) => {
            return `
                <div class="page">
                    <div class="subpage">
                        <div class="header"></div>
                        <div class="main">
                            <div class="sub-header">
                                <div class="left"></div>
                                <div class="right"></div>
                            </div>
                            <p style="font-size: 14px; font-weight: 800; text-align: center; padding: 10px;">${student.examinationType}</p>
                            <div class="content"></div>
                        </div>
                        <div class="footer"></div>
                        <p style="text-align: right">Page ${pageCount} of ${totalPages}</p>
                    </div>    
                </div>
            `;
        }
    };

    let pageCount = 1;
    let totalPages = 0;
    let maxCourseCount = 0;
    let time = 1000;
    let timer;

    function getCourseRows (header, classes="") {
        let $mainSubHeader = $("<div></div>");
        const iaRows = [];
        const twRows = [];
        header.courses.forEach((course) => {
            if (course.type === "IA/ESE") {
                let currentRowIndex = iaRows.length - 1;
                // create first row
                if (iaRows.length === 0 || iaRows[currentRowIndex].cols.length % maxCourseCount === 0) {
                    iaRows.push({cols: []});
                    currentRowIndex = iaRows.length - 1;
                }
                iaRows[currentRowIndex].cols.push($(htmls.courseCol(course, classes, header.isHeader)));
            } else if (course.type === "TW/PR/OR") {
                let currentRowIndex = twRows.length - 1;
                // create first row
                if (twRows.length === 0 || twRows[currentRowIndex].cols.length % maxCourseCount === 0) {
                    twRows.push({cols: []});
                    currentRowIndex = twRows.length - 1;
                }
                twRows[currentRowIndex].cols.push($(htmls.courseCol(course, classes, header.isHeader)));
            }
        });
        
        classes += ` max-col-${maxCourseCount} `;
        iaRows.forEach((row, index) => {
            const data = {
                left: {
                    text: "ESE/IA"
                }
            };
            const $row = $(htmls.courseRow(data, classes));
            row.cols.forEach(col => {
                $row.find(".course-row-main").append(col);
            });
            $mainSubHeader.append($row);
        });
    
        twRows.forEach((row, index) => {
            const data = {
                left: {
                    text: "TW/OR/PR"
                }
            }
            const $row = $(htmls.courseRow(data, classes));
            row.cols.forEach(col => {
                $row.find(".course-row-main").append(col);
            });
            $mainSubHeader.append($row);
        });
    
        return $mainSubHeader;
    };
    
    function getBlock (student) {
        // create student block
        const $block = $(htmls.block(student));
        // create courses
        const $courseRows = getCourseRows(student, "student-row");
        // create backlog
        const $backlog = htmls.backlog(student.backlog);
        // create right column total
        const $total = htmls.courseRowsTotalCol(student.totals);
    
        // append generated htmls to block
        $block.find(".left").append($courseRows.html());
        $block.find(".right").append($total);
        $block.find(".block-footer").append($backlog);
    
        return $block;
    }
    
    function getPages (students, perPage, $headerRows, $headerRowsRight, $pageHeader, $pageFooter) {
        const pages = [];
        let currentPage = 0;
        students.forEach((student, index) => {
            if (index === 0 || index % perPage === 0) {
                // create new page
                pages.push($(htmls.page(student, pageCount++, totalPages)));
                currentPage = pages.length - 1;
    
                // set header rows
                pages[currentPage].find(".main .sub-header .left").append($headerRows.html());
                // set header rows totals
                pages[currentPage].find(".main .sub-header .right").append($headerRowsRight);
    
                // set page header
                pages[currentPage].find(".subpage .header").append($pageHeader);
                // set page footer
                pages[currentPage].find(".subpage .footer").append($pageFooter);
            }
            
            // get block
            const $block = getBlock(student);
    
            // append block in main content
            pages[currentPage].find(".main .content").append($block);
        });
        return pages;
    }
    
    function groupBy (objectArray, property) {
        return objectArray.reduce((acc, obj) => {
           const key = obj[property];
           if (!acc[key]) {
              acc[key] = [];
           }
           // Add object to list for given key's value
           acc[key].push(obj);
           return acc;
        }, {});
    }
    
    function enableControls () {
        const elements = `
            <a href="#" class="float-plus non-printable"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 10h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2zm8.172 14l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/></svg></a>
            <a href="#" class="float-minus non-printable"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 10h-8v-2h8v2zm8.172 14l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/></svg></a>
            <a href="#" class="float-print non-printable"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 11v12h-24v-12h4v-10h10.328c1.538 0 5.672 4.852 5.672 6.031v3.969h4zm-6-3.396c0-1.338-2.281-1.494-3.25-1.229.453-.813.305-3.375-1.082-3.375h-7.668v13h12v-8.396zm-2 5.396h-8v-1h8v1zm0-3h-8v1h8v-1zm0-2h-8v1h8v-1z"/></svg></a>
        `;
        $("body").append(elements);

        function handlerIn() {
            clearTimeout(timer);
            $(".float-plus, .float-minus, .float-print").stop(true).css('opacity', 1).show();
        }
        function handlerOut() {
            timer = setTimeout(function() {
                $(".float-plus, .float-minus, .float-print").animate({opacity: 0}, 3000);
            }, time);
        }

        // events
        $("body").on("mousemove", ".float-plus, .float-minus, .float-print", () => {
            handlerIn();
        });
        $("body").on("mouseleave", ".float-plus, .float-minus, .float-print", () => {
            handlerOut();
        });

        let zoomFact = 75;
        $("body").on("click", ".float-plus", (e) => {
            e.preventDefault();
            zoomFact = zoomFact + 25;
            zoomFact = zoomFact > 99 ? 100 : zoomFact;
            $(".page").css("zoom", zoomFact + "%");
        });
        $("body").on("click", ".float-minus", (e) => {
            e.preventDefault();
            zoomFact = zoomFact - 25;
            zoomFact = zoomFact < 50 ? 50 : zoomFact;
            $(".page").css("zoom", zoomFact + "%");
        });
        $("body").on("click", ".float-print", (e) => {
            e.preventDefault();
            window.print();
        });
    }

    function setMaxCoursesCount (courses) {
        const iaeseCount = courses.filter(item => item.type === "IA/ESE").length;
        const twprCount = courses.filter(item => item.type === "TW/PR/OR").length;
        const maxCount = iaeseCount > twprCount ? iaeseCount : twprCount;
        console.log(iaeseCount, twprCount, maxCount, courses);
        maxCourseCount = maxCount > 7 ? 7 : (maxCount < 6 ? 5 : maxCount);
    }

    function init (data) {
        setMaxCoursesCount(data.headers.courses);
        totalPages = Math.ceil(data.students.length / data.perPage);
        const $book = $("<div></div>");
        const $headerRows = getCourseRows(data.headers);
        const $headerRowsRight = htmls.courseRowsTotalCol(data.headers.totals);
        const $pageHeader = htmls.pageHeader(data.headers.title);
        const $pageFooter = htmls.pageFooter(data.footer.courses);
        
        let $pages = [];
    
        // group by examinationType
        const exams = groupBy(data.students, "examinationType");
        Object.keys(exams).sort((a, b) => b - a).forEach(examKey => {
            const newPages = getPages(exams[examKey], data.perPage, $headerRows, $headerRowsRight, $pageHeader, $pageFooter);
            $pages = $pages.concat(newPages);
        });
        
        // put pages in book
        $pages.forEach(page => {
            $book.append(page);
        });
    
        // enable controls
        if ($pages.length) {
            enableControls();
        }

        return $book;
    };

    return { init };
};
