function enableControls () {
    let time = 1000;
    let timer;
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
        courseCol: (data, classes, header=false, electiveCode) => {
            return `
                <div class="course-col ${classes}">
                    <table>
                        ${header ? 
                            `<tr>
                                <td colspan="7">${electiveCode || data.code}</td>
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
                        <table style="text-align: left">
                            <tr>
                                <td width="50px">PRN No: </td>
                                <td width="70px" style="padding-right: 20px;">${student.prn_no}</td>
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
        pageFooter: (courses, electiveName) => {
            let coursesHtml = "";
            courses.forEach(item => {
                let {code, name} = item;
                if (item.name === "Elective-I" || item.name === "Elective-II") {
                    const electiveCourse = electiveName.split("|");
                    code = electiveCourse[0];
                    name = electiveCourse[1];
                }
                coursesHtml += `<div><strong>${code}:</strong> ${name}</div>`;
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

    function getCourseRows (header, classes="", electiveSubjectName) {
        let $mainSubHeader = $("<div></div>");
        const iaRows = [];
        const twRows = [];
        header.courses.forEach((course) => {
            let electiveCourseCode = null;
            if (course.name === "Elective-I" || course.name === "Elective-II") {
                electiveCourseCode = electiveSubjectName.split("|")[0];
            }
            if (course.type === "IA/ESE") {
                let currentRowIndex = iaRows.length - 1;
                // create first row
                if (iaRows.length === 0 || iaRows[currentRowIndex].cols.length % maxCourseCount === 0) {
                    iaRows.push({cols: []});
                    currentRowIndex = iaRows.length - 1;
                }
                iaRows[currentRowIndex].cols.push($(htmls.courseCol(course, classes, header.isHeader, electiveCourseCode)));
            } else if (course.type === "TW/PR/OR") {
                let currentRowIndex = twRows.length - 1;
                // create first row
                if (twRows.length === 0 || twRows[currentRowIndex].cols.length % maxCourseCount === 0) {
                    twRows.push({cols: []});
                    currentRowIndex = twRows.length - 1;
                }
                twRows[currentRowIndex].cols.push($(htmls.courseCol(course, classes, header.isHeader, electiveCourseCode)));
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

    function getTotalPagesCount (groupArrays, perPage) {
        let total = 0;
        groupArrays.forEach(grp => {
            total += Math.ceil(grp.length / perPage);
        });
        return total;
    }

    function setMaxCoursesCount (courses) {
        const iaeseCount = courses.filter(item => item.type === "IA/ESE").length;
        const twprCount = courses.filter(item => item.type === "TW/PR/OR").length;
        const maxCount = iaeseCount > twprCount ? iaeseCount : twprCount;
        maxCourseCount = maxCount > 7 ? 7 : (maxCount < 6 ? 5 : maxCount);
    }

    function isElectiveName (name) {
        const nameArr = name.split("|");
        if (nameArr.length > 1) {
            return true;
        }
        return false;
    }

    function setElectiveKey (data) {
        for (let i=0; i<data.students.length; i++) {
            const student = data.students[i];
            student.elective = "";
            student.courses.forEach(item => {
                if (isElectiveName(item.name)) {
                    student.elective = item.name;
                }
            });
        }
        return data;
    }

    function init (data) {
        data = setElectiveKey(data);
        setMaxCoursesCount(data.headers.courses);
        const $book = $("<div></div>");
        const $headerRowsRight = htmls.courseRowsTotalCol(data.headers.totals);
        const $pageHeader = htmls.pageHeader(data.headers.title);
        
        let $pages = [];
    
        // Grouping
        const groupedStudents = [];
        // group by examinationType
        const examination = groupBy(data.students, "examinationType");
        Object.keys(examination).sort((a, b) => b.localeCompare(a)).forEach(examKey => {
            // group by elective
            const elective = groupBy(examination[examKey], "elective");
            Object.keys(elective).forEach(electKey => {
                groupedStudents.push(elective[electKey]);
            });
        });
        
        // get total number of pages
        totalPages = getTotalPagesCount(groupedStudents, data.perPage);

        // process each group of students in new page
        groupedStudents.forEach(grp => {
            const electiveSubjectName = grp[0].elective;
            const $headerRows = getCourseRows(data.headers, "", electiveSubjectName);
            const $pageFooter = htmls.pageFooter(data.footer.courses, electiveSubjectName);
            const newPages = getPages(grp, data.perPage, $headerRows, $headerRowsRight, $pageHeader, $pageFooter);
            $pages = $pages.concat(newPages);
        })
        
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

function MarksheetGererator () {

    const htmls = {
        page: () => {
            return `
                <div class="page">
                    <div class="subpage">
                        <div class="header"></div>
                        <div class="main"></div>
                        <div class="totals"></div>
                        <div class="backlog"></div>
                        <div class="footer"></div>
                    </div>
                </div>
            `;
        },
        main: ({courses, elective}) => {
            const getPaperType = function (type) {
                return type === "IA/ESE" ? "TH" : (type === "P/O" ? "PR/OR" : "TW");
            };
            const getMinMaxText = (min, max, type) => {
                return min ? `${min}/${max}` : "--";
            };
            const getSubjectText = (name, type) => {
                name = name.replace("(TW)", "").replace("(IA)", "").trim();
                return `${name}`;
            };
            const getGrade = (grade) => {
                return grade === "F" ? grade : (grade && (grade !== "-" || grade !== "--") ? "E" : "--")
            }

            // create table
            let table = `
                <table class="main-table">
                    <thead>
                        <tr>
                            <th rowspan="2">COURSE CODE</th>
                            <th rowspan="2" class="paper-name">COURSE NAME</th>
                            <th rowspan="2">AM</th>
                            <th colspan="3">UA</th>
                            <th colspan="3">CA</th>
                            <th colspan="2">TOTAL</th>
                            <th rowspan="2">Cr</th>
                            <th rowspan="2">Gr</th>
                            <th rowspan="2">GP</th>
                            <th rowspan="2">EGP</th>
                            <th rowspan="2">Rmk</th>
                        </tr>
                        <tr>
                            <th>Min/Max</th>
                            <th>Obt</th>
                            <th>Exm</th>
                            <th>Min/Max</th>
                            <th>Obt</th>
                            <th>Exm</th>
                            <th>Max</th>
                            <th>Obt</th>
                        </tr>
                    </thead>
                    <tbody>`;

            // create table rows
            Object.keys(courses).forEach(key => {
                const papers = courses[key];
                const paperCount = papers.length;
                papers.forEach((paper, index) => {

                    let paperCode = paper.code;
                    let paperName = paper.name;
                    // if (paper.name === "Elective-I" || paper.name === "Elective-II") {
                    //     const electiveSubject = elective.split("|");
                    //     paperCode = electiveSubject[0];
                    //     paperName = electiveSubject[1];
                    // }

                    const {
                        marksMin1,
                        marksMin2,
                        marksMax1,
                        marksMax2,
                        marksTotal
                    } = paper.courseDetails;

                    // add rowspan to grade columns conditionally
                    const nextPaper = papers[index + 1];
                    const lastPaper = papers[index - 1];
                    let gradeColumns = `
                        <td>${paper.c}</td>
                        <td>${paper.g}</td>
                        <td>${paper.gp}</td>
                        <td>${paper.cgp}</td>
                    `;
                    if (paper.type === "TW" && nextPaper && nextPaper.type === "P/O") {
                        const twopRowspan = 2;
                        gradeColumns = `
                            <td rowspan="${twopRowspan}">${paper.c}</td>
                            <td rowspan="${twopRowspan}">${paper.g}</td>
                            <td rowspan="${twopRowspan}">${paper.gp}</td>
                            <td rowspan="${twopRowspan}">${paper.cgp}</td>
                        `;
                    } else if (paper.type === "P/O" && lastPaper && lastPaper.type === "TW") {
                        gradeColumns = "";
                    }

                    let commonColumns = `
                        <td>${getPaperType(paper.type)}</td>
                        <td>${getMinMaxText(marksMin1, marksMax1)}</td>
                        <td>${paper.marks1 || "--"}</td>
                        <td>${getGrade(paper.grade1) || "--"}</td>
                        <td>${getMinMaxText(marksMin2, marksMax2)}${paper.type === "IA/ESE" ? "(IA)" : ""}</td>
                        <td>${paper.marks2 || "--"}</td>
                        <td>${getGrade(paper.grade2) || "--"}</td>
                        <td>${marksTotal}</td>
                        <td>${paper.marksTotal}</td>
                        ${gradeColumns}
                        <td>${getGrade(paper.grade1) === "F" || getGrade(paper.grade2) === "F" ? "F" : ""}</td>
                    `;

                    if (index === 0) {
                        table += `
                            <tr>
                                <td rowspan="${paperCount}">${paperCode}</td>
                                <td class="paper-name" rowspan="${paperCount}">${getSubjectText(paperName, paper.type)}</td>
                                ${commonColumns}
                            </tr>`;
                    } else {
                        table += `<tr>${commonColumns}</tr>`;
                    }
                });
            });

            // close table
            table += `</tbody></table>`;
            return table;
        },
        totals: ({totals, backlog}, {semester}) => {
            let grandTotal = "";
            if (backlog && backlog.length && backlog[backlog.length-1]) {
                grandTotal = backlog[backlog.length-1]["marks"];
            }
            const {totalC, totalCG, GPA, remark, CGPI} = totals;
            return `
                <table class="main-table">
                    <tr>
                        <td style="width: 0.75%;"> ${semester.toUpperCase()}</td> 
                        <td> Credits: ${totalC}</td> 
                        <td> EGP: ${totalCG}</td> 
                        <td> SGPA: ${GPA}</td> 
                        <td> Grand Total: ${grandTotal}</td> 
                    </tr>
                    <tr>
                        <td colspan="3" class="bold">Remarks: ${remark}</td> 
                        <td colspan="2" class="bold">CGPA: ${CGPI || "-"}</td> 
                    </tr>
                </table>
            `;
        },
        backlog: ({backlog}) => {
            if (!backlog.length) {
                return "";
            }

            const updateColumns = ($tr, rowData) => {
                const {sem, sgpi, credit, cg, marks} = rowData;
                $tr.append($(`
                    <td class="sem-name">${sem.toUpperCase()}</td>
                    <td>CRED: ${credit.toUpperCase()}</td>
                    <td>EGP: ${cg.toUpperCase()}</td>
                    <td>SGPA: ${sgpi.toUpperCase()}</td>
                    <td>Total: ${marks.toUpperCase()}</td>
                `));
            };
            const $table = $('<table class="main-table"></table>');
            let index = 0;
            for (let i=0; i < Math.ceil(backlog.length/2); i++) {
                const $tr = $("<tr></tr>");
                if (backlog[index]) {
                    updateColumns($tr, backlog[index]);
                    index++;
                    if (backlog[index]) {
                        $tr.append($(`<td class="divider"></td>`));
                        updateColumns($tr, backlog[index]);
                        index++;
                    }
                }
                $table.append($tr);
            }
            return $table;
        },
        footer: () => {
            return `
                <div class="abbreviations">
                    Abbreviations: Gr: Grade. SGPA: Semester Grade Point Average. CGPA: Cumulative Grade Point Average. EGP:
                    Earned Grade Points. E: Exempted, F: Head Failure, AB:Absent, /: Female, #0.299: Sports Benefit, ~: Dyslexia Benefit, -: Not Applicable,
                    TH: Theory, UA: University Assessment, CA: College Assessment, DA: Direct Admission
                </div>
                <div class="box">
                    <table class="header-table">
                        <thead>
                            <tr>
                                <th class="key">Prepared by</th>
                                <th class="divider">:</th>
                                <th class="value"><div class="line"></div></th>
                            </tr>
                            <tr>
                                <th class="key">Verified by</th>
                                <th class="divider">:</th>
                                <th class="value"><div class="line"></div></th>
                            </tr>
                            <tr>
                                <th class="key">Date</th>
                                <th class="divider">:</th>
                                <th class="value"><div class="line"></div></th>
                            </tr>
                            <tr>
                                <th class="key">Place</th>
                                <th class="divider">:</th>
                                <th style=" font-weight: 600; padding: 0px; padding-left:6px;">MUMBAI</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="row incharge">
                        <div class="key">INCHARGE EXAMINATIONS</div>
                    </div>
                    <div class="row principal">
                        <div class="key">PRINCIPAL</div>
                    </div>
                </div>
            `;
        },
        header: ({title, year}, {seat_no, prn_no, name}) => {
            return `
                <table class="header-table">
                    <thead>
                        <tr>
                            <th class="title" colspan="3">Certificate Showing the Result Of the Candidate</th>
                        </tr>
                        <tr>
                            <th class="key">Name</th>
                            <th class="divider">:</th>
                            <th class="value" colspan="3">${name}</th>
                        </tr>
                        <tr>
                            <th class="key">Examination</th>
                            <th class="divider">:</th>
                            <th class="value">${title}</th>
                        </tr>
                        <tr>
                            <th class="key">Held In</th>
                            <th class="divider">:</th>
                            <th class="value">${year}</th>
                        </tr>
                        <tr>
                            <th class="key">Seat No</th>
                            <th class="divider">:</th>
                            <th class="value">${seat_no}</th>
                        </tr>
                        <tr class="prn-absolute">
                            <th class="key">Prn No</th>
                            <th class="divider">:</th>
                            <th class="value">${prn_no}</th>
                        </tr>
                    </thead>
                </table>
            `;
        }
    };

    function getPages ({students, headers}) {
        const pages = [];
        students.forEach(student => {
            const $page = $(htmls.page());
            $page.find(".main").html($(htmls.main(student)));
            $page.find(".totals").html($(htmls.totals(student, headers)));
            $page.find(".backlog").html($(htmls.backlog(student)));
            $page.find(".footer").html($(htmls.footer()));
            $page.find(".header").html($(htmls.header(headers, student)));
            pages.push($page);
        });
        return pages;
    }

    function init (data) {
        const $book = $("<div></div>");
        const $pages = getPages(data);
        
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
}

function ListGererator () {

    const htmls = {
        page: (pageCount, totalPages, examination) => {
            return `
                <div class="page">
                    <div class="subpage">
                        <div class="header"></div>
                        <p style="font-size: 14;font-weight: 600;text-align: center;background: #ddd;padding: 2px;}">
                            ${examination} EXAMINATION
                        </p>
                        <div class="main"></div>
                        <div class="footer"></div>
                        <p style="text-align: right">Page ${pageCount} of ${totalPages}</p>
                    </div>
                </div>
            `;
        },
        main: (students, isSeatingArrangement) => {
            if (isSeatingArrangement) {
                let html = `<div class="seats">`;
                students.forEach(student => {
                    html += `<span>${student.seat_no}</span>`;
                });
                html += "</div>";
                return html;
            }
            // create table
            let table = `
                <table class="main-table">
                    <thead>
                        <tr>
                            <th rowspan="2" class="seat_no">Seat No.</th>
                            <th rowspan="2" class="student_name">Student Name</th>
                            <th colspan="2">Marks Obtained</th>
                        </tr>
                        <tr>
                            <th>In Figures</th>
                            <th>In Words</th>
                        </tr>
                    </thead>
                    <tbody>`;

            // create table rows
            students.forEach(student => {
                table += `
                    <tr>
                        <td class="seat_no">${student.seat_no}</td>
                        <td class="student_name">${student.student_name}</td>
                        <td class="mark_figures"></td>
                        <td class="mark_words"></td>
                    </tr>
                `;
            });

            // close table
            table += `</tbody></table>`;
            return table;
        },
        footer: () => {
            return `
                <div class="head-box" style="width: 100%; justify-content: left;">
                    <div style="display: flex; width: 80%;">
                        <div class="bolder">1) Internal Examiner Name, Sign. & College</div>
                        <div class="line" style="flex: 1"></div>
                    </div>
                </div>
                <div class="head-box" style="width: 100%; justify-content: left;">
                    <div style="display: flex; width: 80%;">
                        <div class="bolder">2) External Examiner Name, Sign. & College</div>
                        <div class="line" style="flex: 1"></div>
                    </div>
                </div>
                <div class="head-box" style="width: 100%;">
                    <div style="display: flex; width: 350px;">
                        <div class="bolder">Signature of the Principal</div>
                        <div class="line" style="flex: 1"></div>
                    </div>
                    <div style="display:flex; width: 150px;">
                        <div class="bolder">Date</div>
                        <div class="line" style="flex: 1"></div>
                    </div>
                    <div style="display:flex; width: 150px; justify-content: end;">
                        <div class="bolder">College Seal</div>
                    </div>
                </div>
            `;
        },
        header: ({fullHead, branch, semester, year, subjectName, pattern}, isSeatingArrangement) => {
            const title = isSeatingArrangement ? "Seating Arrangement for ESE" : `Head: ${fullHead}`;
            const subjectCode = isSeatingArrangement ? "" : `
                <div style="display:flex; width: 200px;">
                    <div class="bolder">Subject Code:</div>
                    <div class="line" style="flex: 1"></div>
                </div>
            `;
            const maxMarkHtml = isSeatingArrangement ? "" : `
                <div style="display:flex; width: 200px;">
                    <div class="bolder">Max. Marks:</div>
                    <div class="line" style="flex: 1"></div>
                </div>
            `;
            const minMarkHtml = isSeatingArrangement ? "" : `
                <div style="display:flex; width: 200px;">
                    <div class="bolder">Min. Marks:</div>
                    <div class="line" style="flex: 1"></div>
                </div>
            `;
            const sem = semester.replace("Sem", "").trim();
            let semText = "SE-" + sem;
            if (sem == "VI" || sem == "V") {
                semText = "TE-" + sem;
            }
            return `
                <p>Anjuman-I-Islam's</p>
                <p style="font-size: 18px; font-weight: 600;">M.H. SABOO SIDDIK COLLEGE OF ENGINEERING</p>
                <P style="font-weight: 600;">8, Saboo Siddik Polytechnic Road, Byculla, Mumbai-400008</P>
                <P style="font-size: 12px; margin-top: 15px; font-weight: 800;">Examination held "${year.replace("DEC", "DECEMBER -").replace("MAY", "MAY -")}"</P>
                <P style="font-size: 12px; font-weight: 800;">${title}</P>
                <div class="head-box">
                    <div>
                        <span class="bolder">Semester:</span>
                        <span>${semText} (C-SCHEME)(R-19)</span>
                    </div>
                    <div>
                        <span class="bolder">Branch:</span>
                        <span>${branch}</span>
                    </div>
                </div>
                <div class="head-box">
                    <div style="display: flex; width: 70%;">
                        <span class="bolder">Subject:</span>
                        <span style="flex: 1; margin-left: 9px; text-align: left;">
                            ${subjectName.replace("(TW)", "").replace("(IA)", "")}
                            <div class="line" style="margin: 0;"></div>
                        </span>
                    </div>
                    ${subjectCode}
                </div>
                <div class="head-box">
                    <div style="display: flex; width: 70%;">
                        <span style="text-align: center; flex: 1">(full name)</span>
                    </div>
                    ${maxMarkHtml}
                </div>
                <div class="head-box">
                    <div style="display:flex; width: 200px;">
                        <div class="bolder">Date:</div>
                        <div class="line" style="flex: 1"></div>
                    </div>
                    ${minMarkHtml}
                </div>
            `;
        }
    };

    function isFailedIn (value) {
        return !value || value == "" || value == "F" || value == "-";
    };

    function getSubjectWisefilterStudents (students, {subNotation, head}) {
        if (!subNotation || subNotation.toUpperCase() === "ALL") {
            return students;
        }
        return students.filter(item => {
            if (head.toUpperCase() === "ALL") {
                return isFailedIn(item[`${subNotation}_TWPR_grade`]) || isFailedIn(item[`${subNotation}_IAESE_grade`]);
            } else if (head === "IA") {
                return isFailedIn(item[`${subNotation}_grade_IA`]);
            } else if (head === "ESE") {
                return isFailedIn(item[`${subNotation}_grade_ESE`]);
            } else if (head === "TW") {
                return isFailedIn(item[`${subNotation}_grade_TW`]);
            } else if (head === "PR") {
                return isFailedIn(item[`${subNotation}_grade_PR`]);
            }
        });
    };

    function getBook ({students, headers, isSeatingArrangement}, $book) {

        students = getSubjectWisefilterStudents(students, headers).map(item => {
            item.partwhole = item.partwhole.toUpperCase();
            return item;
        });

        const groupedStudents = [];
        const examType = groupBy(students, "partwhole");
        Object.keys(examType).sort((a, b) => b.localeCompare(a)).forEach(examKey => {
            groupedStudents.push(examType[examKey]);
        });

        const pages = [];
        const size = isSeatingArrangement ? 198 : 16;
        groupedStudents.forEach(studentGroup => {
            for (var i=0; i<studentGroup.length; i+=size) {
                pages.push(studentGroup.slice(i,i+size));
            }
        });

        const totalPages = pages.length;
        let pageCount = 1;
        $book.html("");
        if (pages.length) {
            pages.forEach(studentsSet => {
                const $page = $(htmls.page(pageCount++, totalPages, studentsSet[0].partwhole));
                $page.find(".main").html($(htmls.main(studentsSet, isSeatingArrangement)));
                $page.find(".header").html($(htmls.header(headers, isSeatingArrangement)));
                if (!isSeatingArrangement) {
                    $page.find(".footer").html($(htmls.footer()));
                }
                $book.append($page);
            });
        } else {
            const $page = $(htmls.page(pageCount, totalPages, "NO STUDENTS FOR "));
            $page.find(".main").html($(htmls.main([], isSeatingArrangement)));
            $page.find(".header").html($(htmls.header(headers, isSeatingArrangement)));
            if (!isSeatingArrangement) {
                $page.find(".footer").html($(htmls.footer()));
            }
            $book.html($page);
            // $book.html($(`<h1>No Students found!</h1>`));
        }

        return $book;
    }

    function init (data) {
        const $book = $("<div></div>");
        // enable controls
        enableControls();
        return getBook(data, $book);
    };

    return { init };
}