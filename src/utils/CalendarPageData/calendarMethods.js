export  const calendarMethods ={
    methods:{
        async changeData() {
            await this.$store.dispatch('setDragAndDrop', (await this.$axios.get(`/orderCalendar/${this.changeCalendar}`)).data)
            this.mainData = await this.$store.getters['getDragAndDrop']
        },
        funk(key) {
            this.navKey = key
        },
        async funks(item){
            item.value = false
            await this.$store.dispatch('setDragAndDrop', (await this.$axios.get(`orderCalendar/${ this.today}`))?.data)
            this.mainData = await this.$store.getters['getDragAndDrop']
        },
        async handleDragStart(lane, dragResult, key, i) {
            this.calendar.monthNames.forEach((a,l)=>{
                a===this.navKey?this.month= l+1:'';

            })
            const {payload, isSource} = dragResult
            if (isSource) {
                this.draggingCard = {
                    key: key,
                    lane: lane,
                    index: payload.index,
                    cardData: {
                        ...this.mainData?.data[key][i][lane][payload.index]
                    }
                }
            }
        },
        async handleDrop(lane, dropResult, key, i) {
            const {removedIndex, addedIndex} = dropResult
            if (lane === this.draggingCard?.lane && removedIndex === addedIndex) {
                return;
            }
            if (removedIndex !== null) {
                this.mainData?.data[key][i][lane].splice(removedIndex, 1)
            }
            if (addedIndex !== null) {
                this.mainData?.data[key][i][lane].splice(addedIndex, 0, this.draggingCard?.cardData)
                this.modalData = this.draggingCard?.cardData
                this.openDrag = false
                // eslint-disable-next-line
                let filterMonth = ''
                let filterDay = ''
                let findMon = []
                for (let j = 0; j < this.calendar?.monthNames.length; j++) {
                    // eslint-disable-next-line
                    if (this.calendar?.monthNames[j] === key) {
                        this.calendar?.monthNames.forEach((el, s) => {
                            el === key ? findMon.push({text: el, index: s}) : ''
                        })
                        if ((this.month === 12||this.month===11) && (findMon[0].index === 0 || findMon[0].index === 1)) {
                            this.today=+(new Date().toISOString().slice(0, 4))+ 1
                        }else {
                            this.today=(+(new Date().toISOString().slice(0, 4)))
                        }
                        if ((j + 1).toString().length === 2) {
                            filterMonth = (j + 1)
                        } else {
                            filterMonth = ('0' + (j + 1))
                        }
                    }
                }
                if ((i + 1).toString().length === 2) {
                    filterDay = (i + 1)
                } else {
                    filterDay = ('0' + (i + 1))
                }
                try {
                    let date = new Date(+this.today, filterMonth-1, filterDay).getTime()
                    console.log(new Date(date), "uts")
                    this.$axios.put(`/order/${this.draggingCard.cardData.order.id}`, {when_to:date,title:this.draggingCard.cardData.title})
                    this.mainData = await this.$store.getters['getDragAndDrop']

                } catch (err) {
                    console.log(err)
                }
            }
        },
        getChildPayload(index) {
            return {
                index,
            };
        },
        scrollHeadStart() {
            let currentScroll = document.documentElement.scrollTop
            this.edite = setInterval(frame, 6)

            function frame() {
                currentScroll = currentScroll - 5
                document.documentElement.scrollTop = currentScroll
            }
        },
        scrollHeadFinish() {
            clearInterval(this.edite)
        },
        scrollFooterStart() {
            let currentScroll = document.documentElement.scrollTop
            this.edite = setInterval(frame, 6)
            function frame() {
                currentScroll = currentScroll + 5
                document.documentElement.scrollTop = currentScroll

            }
        },
        scrollFooterFinish() {
            clearInterval(this.edite)
        },
    }
}