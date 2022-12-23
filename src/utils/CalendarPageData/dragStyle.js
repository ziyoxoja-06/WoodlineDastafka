function WeekCardEdite(value) {
   return  value===true?'' +
       '   bg-white\n' +
       '  fixed\n' +
       '  z-10\n' +
       '  top-0\n' +
       '  text-[14px]\n' +
       '  p-2\n' +
       '  px-3\n' +
       '  mt-16\n' +
       '  md:mt-10\n' +
       '  sm:ml-3 lg:ml-6 md:ml-6 min-h-[60px]' +
       '   sm:ml-5\n' +
        '  sm:w-[36.8rem]\n' +
        '  md:w-[47rem]\n' +
        '  lg:w-[67rem]\n' +
        '  xl:w-[67rem]\n' +
        '  2xl:w-[74rem]'
                        :
       '   bg-white\n' +
       '  fixed\n' +
       '  z-10\n' +
       '  top-0\n' +
       '  text-[14px]\n' +
       '  p-2\n' +
       '  px-3\n' +
       '  mt-16\n' +
       '  md:mt-10\n' +
       '  sm:ml-3 lg:ml-6 md:ml-6 min-h-[60px]' +
        ' sm:ml-5\n' +
        '  sm:w-[36.8rem]\n' +
        '  md:w-[47rem]\n' +
        '  lg:w-[67rem]\n' +
        '  xl:w-[78.5rem]\n' +
        '  2xl:w-[94rem]'
}
// Drag And Drop card style
function dragMainCard(drawer) {
   return  drawer===true?''+
    'bg-amber-500\n' +
    '     p-3\n' +
    '     ml-[1.1rem]\n' +
    '     mt-2\n' +
    '     w-[13%]\n' +
    '     sm:ml-[0.7rem]\n' +
    '     md:ml-[1.2rem]\n' +
    '     lg:ml-[1.4rem]\n' +
    '     xl:ml-[2.1rem]\n' +
    '     2xl:ml-[1.1rem]\n' +
    '     sm:w-[4.5rem]\n' +
    '     md:w-[5.5rem]\n' +
    '     lg:w-[8rem]\n' +
    '     xl:w-[7.3rem]\n' +
    '     2xl:w-[9.3rem]\n' +
    '     min-h-[200px]'

                    :

       'bg-amber-500\n' +
       '     p-3\n' +
       '     ml-[1.1rem]\n' +
       '     mt-2\n' +
       '     w-[13%]\n' +
       '     sm:ml-[0.7rem]\n' +
       '     md:ml-[1.2rem]\n' +
       '     lg:ml-[1.4rem]\n' +
       '     xl:ml-[2.1rem]\n' +
       '     2xl:ml-[1.1rem]\n' +
       '     sm:w-[4.5rem]\n' +
       '     md:w-[5.5rem]\n' +
       '     lg:w-[8rem]\n' +
       '     xl:w-[9rem]\n' +
       '     2xl:w-[12.3rem]\n' +
       '     min-h-[200px]'
}
function startMonthWeek(drawers,mainData,key,calendar){
    return drawers===true?mainData?.sendingDataDays[key]===calendar.days.uz[0]?'hidden':
        mainData.sendingDataDays[key]===calendar.days.uz[1]?'  md:w-[6.3rem] lg:w-[9rem] xl:w-[10.5rem] 2xl:w-[26rem] ':
            mainData?.sendingDataDays[key]===calendar.days.uz[2]?'  lg:w-[22rem] ':
                mainData?.sendingDataDays[key]===calendar.days.uz[3]?'    lg:w-[32.7rem]':
                    mainData?.sendingDataDays[key]===calendar.days.uz[4]?'   lg:w-[44rem] 2xl:w-[53.1]':
                        mainData?.sendingDataDays[key]===calendar.days.uz[5]?'sm:w-[33rem] md:w-[39rem] lg:w-[55rem] xl:w-[65rem] 2xl:w-[79rem] ':
                            mainData?.sendingDataDays[key]===calendar.days.uz[6]?'sm:w-[33.6rem] md:w-[39.5rem] lg:w-[55.7rem] xl:w-[66rem] 2xl:w-[79.7rem]':''
        :
        mainData?.sendingDataDays[key]===calendar.days.uz[0]?'hidden':
            mainData?.sendingDataDays[key]===calendar.days.uz[1]?'md:w-[6.3rem] lg:w-[9rem] xl:w-[10.5rem] 2xl:w-[13rem]':
                mainData?.sendingDataDays[key]===calendar.days.uz[2]?'md:w-[6.3rem] lg:w-[18.3rem] xl:w-[21.7rem] 2xl:w-[26.3rem] ':
                    mainData?.sendingDataDays[key]===calendar.days.uz[3]?'lg:w-[27.7rem] xl:w-[32.7rem] 2xl:w-[39.8rem]':
                        mainData?.sendingDataDays[key]===calendar.days.uz[4]?'lg:w-[46.5rem] xl:w-[55.1rem] 2xl:w-[53.1rem]':
                            mainData?.sendingDataDays[key]===calendar.days.uz[5]?'lg:w-[46.5rem] xl:w-[55rem] 2xl:w-[66.6rem] ':
                                mainData?.sendingDataDays[key]===calendar.days.uz[6]?'sm:w-[33.6rem] md:w-[39.5rem] lg:w-[55.7rem] xl:w-[66rem] 2xl:w-[79.7rem]':''
}
function mainDiv(drawers) {
    return drawers===true?' sm:w-[38rem]\n'+
        '                        md:w-[50rem]\n'+
        '                        lg:w-[68rem]\n'+
        '                        xl:w-[80rem]\n'+
        '                        2xl:w-[76rem]':
        ' sm:w-[38rem]\n'+
        '                        md:w-[50rem]\n'+
        '                        lg:w-[68rem]\n'+
        '                        xl:w-[80rem]\n'+
        '                        2xl:w-[96rem]'
}

export {
    WeekCardEdite,
    dragMainCard,
    startMonthWeek,
    mainDiv
}