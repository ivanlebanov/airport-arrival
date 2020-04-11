<template lang="html">
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-12">
        <h1 v-if="$route.params && $route.params.code">Бланка №{{ $route.params.code }}</h1>
        <h1 v-else>Нова Бланка</h1>

        <form @submit.prevent="saveForm()">
          <div class="card mb-3" v-if="$route.name === 'FormPreview'">
            <div class="card-body">
              <p class="m-0 text-success">
                Вашата бланка <strong>{{ (formData.verified) ? 'е' : 'не е' }}</strong> потвърдена от полицай.
                <template v-if="formData.homeDate">
                  Имате до <strong>{{ new Date(formData.homeDate).getHours() }}:{{ new Date(formData.homeDate).getMinutes() }}</strong>
                  на <strong> {{ getDateOnly(new Date(formData.homeDate)) }}</strong> да се приберете.
                  Вашата карантина изтича на
                  <strong>{{ getQuarantineEnd(new Date(formData.homeDate)) }}</strong>.
                </template>
              </p>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-header">
              1. Лична Информация
            </div>
            <div class="card-body">
              <label for="name">Три Имена*</label>
              <input id="name" type="text" v-model="form.name" placeholder="Три Имена*" class="form-control mb-3" required :disabled="mode === 'preview'">
              <div class="row">
                <div class="col-md-6">
                  <label for="id">ЕГН*</label>
                  <input id="id" type="text" v-model="form.id" placeholder="ЕГН*" class="form-control mb-3" required :disabled="mode === 'preview'">
                  <label for="mobile">Мобилен телефон</label>
                  <input id="mobile" type="text" v-model="form.mobile" placeholder="Мобилен телефон" class="form-control mb-3" required :disabled="mode === 'preview'">
                </div>
                <div class="col-md-6">
                  <label for="age">Възраст*</label>
                  <input id="age" type="text" v-model="form.age" placeholder="Възраст*" class="form-control mb-3" required :disabled="mode === 'preview'">
                  <label for="phone">Домашен телефон</label>
                  <input id="phone" type="text" v-model="form.phone" placeholder="Домашен телефон" class="form-control mb-3" :disabled="mode === 'preview'">
                </div>
              </div>
              <label for="email">Email*</label>
              <input id="email" type="email" v-model="form.email" placeholder="Email*" class="form-control" required :disabled="mode === 'preview'">

            </div>
          </div>
          <div class="card mb-3">
            <div class="card-header">
              2. Информация за полета
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <label for="arrival">Дата на пристигане*</label>
                  <vuejs-datepicker id="arrival" v-model="form.arrival" input-class="form-control bg-white mb-3" :language="bg" :disabled="mode === 'preview'"></vuejs-datepicker>
                  <label for="flightCompany">Авиокомпания*</label>
                  <input id="flightCompany" type="text" v-model="form.flightCompany" placeholder="Авиокомпания*" class="form-control" required :disabled="mode === 'preview'">
                </div>
                <div class="col-md-6">
                  <label for="flightNumber">Номер на полета*</label>
                  <input id="flightNumber" type="text" v-model="form.flightNumber" placeholder="Номер на полета*" class="form-control mb-3" required :disabled="mode === 'preview'">
                  <label for="flightSeat">Mясто в самолета*</label>
                  <input id="flightSeat" type="text" v-model="form.flightSeat" placeholder="Mясто в самолета*" class="form-control" required :disabled="mode === 'preview'">
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-header">
              3. Постоянен адрес
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <label for="addressCountry">Държава*</label>
                  <input id="addressCountry" type="text" v-model="form.address.country" placeholder="Държава*" class="form-control mb-3" required :disabled="mode === 'preview'">
                </div>
                <div class="col-md-6">
                  <label for="addresscity">Град/село*</label>
                  <input id="addresscity" type="text" v-model="form.address.city" placeholder="Град/село*" class="form-control mb-3" required :disabled="mode === 'preview'">
                </div>
              </div>
              <div class="row">
                <div class="col-md-8">
                  <label for="addressstreet">Улица</label>
                  <input id="addressstreet" type="text" v-model="form.address.street" placeholder="Улица" class="form-control mb-3" :disabled="mode === 'preview'">
                </div>
                <div class="col-md-4">
                  <label for="addressnumber">Номер</label>
                  <input id="addressnumber" type="text" v-model="form.address.number" placeholder="Номер" class="form-control mb-3" :disabled="mode === 'preview'">
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <label for="addressvhod">Вход</label>
                  <input id="addressvhod" type="text" v-model="form.address.entrance" placeholder="Вход" class="form-control" :disabled="mode === 'preview'">
                </div>
                <div class="col-md-4">
                  <label for="addressetaj">Етаж</label>
                  <input id="addressetaj" type="text" v-model="form.address.floor" placeholder="Етаж" class="form-control" :disabled="mode === 'preview'">
                </div>
                <div class="col-md-4">
                  <label for="addressapa">Апартамент</label>
                  <input id="addressapa" type="text" v-model="form.address.apartament" placeholder="Апартамент" class="form-control" :disabled="mode === 'preview'">
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-header">
              4. Адрес, на който ще пребивавате следващите 14 дни
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <label for="addressCountry2">Държава*</label>
                  <input id="addressCountry2" type="text" v-model="form.addressQuarantine.country" placeholder="Държава*" class="form-control mb-3" required :disabled="mode === 'preview'">
                </div>
                <div class="col-md-6">
                  <label for="addresscity2">Град/село*</label>
                  <input id="addresscity2" type="text" v-model="form.addressQuarantine.city" placeholder="Град/село*" class="form-control mb-3" required :disabled="mode === 'preview'">
                </div>
              </div>
              <div class="row">
                <div class="col-md-8">
                  <label for="addressstreet2">Улица</label>
                  <input id="addressstreet2" type="text" v-model="form.addressQuarantine.street" placeholder="Улица" class="form-control mb-3" :disabled="mode === 'preview'">
                </div>
                <div class="col-md-4">
                  <label for="addressnumber2">Номер</label>
                  <input id="addressnumber2" type="text" v-model="form.addressQuarantine.number" placeholder="Номер" class="form-control mb-3" :disabled="mode === 'preview'">
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <label for="addressvhod2">Вход</label>
                  <input id="addressvhod2" type="text" v-model="form.addressQuarantine.entrance" placeholder="Вход" class="form-control" :disabled="mode === 'preview'">
                </div>
                <div class="col-md-4">
                  <label for="addressetaj2">Етаж</label>
                  <input id="addressetaj2" type="text" v-model="form.addressQuarantine.floor" placeholder="Етаж" class="form-control" :disabled="mode === 'preview'">
                </div>
                <div class="col-md-4">
                  <label for="addressapa2">Апартамент</label>
                  <input id="addressapa2" type="text" v-model="form.addressQuarantine.apartament" placeholder="Апартамент" class="form-control" :disabled="mode === 'preview'">
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-header">
              5. Личен лекар
            </div>
            <div class="card-body">
              <label for="doctorname">Име*</label>
              <input id="doctorname" type="text" v-model="form.doctor.name" placeholder="Три Имена*" class="form-control mb-3" required :disabled="mode === 'preview'">
              <div class="row">
                <div class="col-md-6">
                  <label for="doctormobile">Мобилен телефон</label>
                  <input id="doctormobile" type="text" v-model="form.doctor.mobile" placeholder="Мобилен телефон" class="form-control mb-3" :disabled="mode === 'preview'">
                </div>
                <div class="col-md-6">
                  <label for="doctorphone">Домашен телефон</label>
                  <input id="doctorphone" type="text" v-model="form.doctor.phone" placeholder="Домашен телефон" class="form-control mb-3" :disabled="mode === 'preview'">
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-header">
              6. Данни на лице, което може да се свърже с Вас при спешен случай
            </div>
            <div class="card-body">
              <label for="friendname">Три Имена*</label>
              <input id="friendname" type="text" v-model="form.friend.name" placeholder="Три Имена*" class="form-control mb-3" required :disabled="mode === 'preview'">
              <div class="row">
                <div class="col-md-6">
                  <label for="friendmobile">Мобилен телефон</label>
                  <input id="friendmobile" type="text" v-model="form.friend.mobile" placeholder="Мобилен телефон" class="form-control mb-3" :disabled="mode === 'preview'">
                </div>
                <div class="col-md-6">
                  <label for="friendphone">Домашен телефон</label>
                  <input id="friendphone" type="text" v-model="form.friend.phone" placeholder="Домашен телефон" class="form-control mb-3" :disabled="mode === 'preview'">
                </div>
              </div>
              <label for="friendemail">Email</label>
              <input id="friendemail" type="email" v-model="form.friend.email" placeholder="Email" class="form-control" :disabled="mode === 'preview'">

            </div>
          </div>
          <div class="card mb-3">
            <div class="card-header">
              7. Ако пътувате с други членове от семейството, впишете имената им
            </div>
            <div class="card-body">
              <template v-for="(member, i) in form.familyMembers">
                <input class="form-control mb-3" type="text" :key="i" :id="'fname' + i" placeholder="Име" v-model="member.name" :disabled="mode === 'preview'">
              </template>
              <button type="button" name="button" class="btn btn-sm btn-dark" @click="addMore('familyMembers')" :disabled="mode === 'preview'">Добави още</button>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-header">
              8. Ако пътувате с други лица, впишете имената им
            </div>
            <div class="card-body">
              <template v-for="(member, m) in form.otherMembers">
                <input class="form-control mb-3" type="text" :key="m + 'test'" :id="'fname' + m" placeholder="Име" v-model="member.name" :disabled="mode === 'preview'">
              </template>
              <button type="button" name="button" class="btn btn-sm btn-dark" @click="addMore('otherMembers')" :disabled="mode === 'preview'">Добави още</button>

            </div>
          </div>
          <div class="card mb-3">
            <div class="card-header">
              9. Подпис
            </div>
            <div class="card-body" style="position:relative">
              <b-form-checkbox
                v-model="form.declared"
                name="checkbox-validation"
                class="mb-3"
                :disabled="mode === 'preview'"
              >
              Декларирам, че съм информиран да спазвам задължителна 14 дневна карантина
            </b-form-checkbox>
            <div>Подпишете се в мястото по-долу*</div>
              <canvas ref="draw" id="draw" height="100" style="border:1px solid;position:relative;float:left;" class="mt-3"></canvas>
            </div>
          </div>
          <div class="card" v-if="$route.name === 'AdminFormEdit'">
            <div class="card-header">
              Колко часа да се дадат на гражанина?
            </div>
            <div class="card-body">
              <label for="chasove">Часове:</label>
              <input id="chasove" class="form-control mb-3" type="number" placeholder="Часове" v-model="adminForm.hours">
            </div>
          </div>

          <button v-if="$route.name !== 'FormPreview'" type="submit" name="button" class="btn btn-primary mt-3 mb-3">Запази</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import { bg } from 'vuejs-datepicker/dist/locale'

export default {
  name: 'Form',
  data() {
    return {
      adminForm: {
        verified: true,
        homeDate: this.moment(new Date()).add(1, 'hours'),
        hours: 1
      },
      formData: {
        verified: 0,
        homeDate: new Date()
      },
      bg: bg,
      mode: 'edit',
      form: {
        address: {
          country: '',
          city: '',
          street: '',
          number: '',
          entrance: '',
          floor: '',
          apartament: ''
        },
        addressQuarantine: {
          country: '',
          city: '',
          street: '',
          number: '',
          entrance: '',
          floor: '',
          apartament: ''
        },
        friend: {
          phone: '',
          mobile: '',
          email: '',
          name: ''
        },
        doctor: {
          phone: '',
          mobile: '',
          name: ''
        },
        name: '',
        id: '',
        age: 1,
        phone: '',
        mobile: '',
        email: '',
        arrival: new Date(),
        flightNumber: '',
        flightSeat: '',
        flightCompany: '',
        signiture: '',
        declared: false,
        date: new Date(),
        familyMembers: [{ name: '' }, { name: '' }],
        otherMembers: [{ name: '' }, { name: '' }]
      },
      canvas: null,
      ctx: null,
      mouseDown: 0,
      touchX: 0,
      touchY: 0,
      mouseX: 0,
      mouseY: 0
    }
  },
  async mounted() {
    this.init()
    if(this.$route.name  === 'AdminFormEdit') {
      this.mode = 'preview'
    }
    if(this.$route.params && this.$route.params.code){
      const form = await this.$store.dispatch('form/single', this.$route.params.code)
      this.form = form.form
      this.formData.verified = form.verified
      this.formData.homeDate = form.homeDate
      if(form.verified) {
        this.mode = 'preview'
      }
      const image = new Image()
      let self = this
      image.onload = function() {
        self.ctx.drawImage(image, 0, 0)
      }
      image.src = this.form.signiture
    } else {
      let user = await this.$store.dispatch('user/checkToken')
      this.form.name = this.user.name
      this.form.id = this.user.id
      this.form.phone = this.user.phone
      this.form.mobile = this.user.mobile
      this.form.email = this.user.email
      this.form.age = this.calculateAge(new Date(this.user.dateOfbirth))
    }
  },
  components: { 'vuejs-datepicker': Datepicker },
  methods: {
    async saveForm() {
      if(this.$route.name === 'AdminFormEdit') {
        this.adminForm.homeDate = this.moment(new Date()).add(this.adminForm.hours, 'hours')
        await this.$store.dispatch('form/verify', {...this.adminForm, code: this.$route.params.code })
      } else {
        if(this.$route.params && this.$route.params.code){
          await this.$store.dispatch('form/update', {...this.form, code: this.$route.params.code })
        } else {
          await this.$store.dispatch('form/add', this.form)
        }
      }
    },
    addMore(obj) {
     this.form[obj].push({ name: '' })
    },
    init() {
      this.canvas = document.querySelector('#draw')
      if (this.canvas.getContext) {
        this.ctx = this.canvas.getContext('2d')
      }
      if (this.ctx) {
        let self = this
        this.canvas.addEventListener('mousedown', self.sketchpad_mouseDown, false)
        this.canvas.addEventListener('mousemove', self.sketchpad_mouseMove, false)
        window.addEventListener('mouseup', self.sketchpad_mouseUp, false)
        this.canvas.addEventListener('touchstart', self.sketchpad_touchStart, false)
        this.canvas.addEventListener('touchmove', self.sketchpad_touchMove, false)
      }
    },
    getTouchPos(e) {
        if (!e)
          e = event
        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
              var rect = this.offset(this.canvas)
              const touch = e.touches[0]
              this.touchX = touch.pageX - touch.target.offsetLeft
              this.touchY= touch.pageY - rect.top
            }
        }
    },
    offset(el) {
      var rect = el.getBoundingClientRect(),
      scrollLeft = document.documentElement.scrollLeft,
      scrollTop = document.documentElement.scrollTop;
      return { top: rect.top + scrollTop , left: rect.left + scrollLeft }
    },
    drawDot(ctx,x,y,size) {
        let r=0
        let g=0
        let b=0
        let a=255
        this.ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")"
        this.ctx.beginPath()
        this.ctx.arc(x, y, size, 0, Math.PI*2, true)
        this.ctx.closePath()
        this.ctx.fill()
        this.form.signiture = this.canvas.toDataURL()
    },

    clearCanvas(canvas,ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    sketchpad_mouseDown() {
        this.mouseDown = 1
        this.drawDot(this.ctx,this.mouseX,this.mouseY,3)
    },
    sketchpad_mouseUp() {
      this.mouseDown = 0
    },
    sketchpad_mouseMove(e) {
      this.getMousePos(e)
      if (this.mouseDown === 1) {
        this.drawDot(this.ctx,this.mouseX,this.mouseY,3)
      }
    },
    getMousePos(e) {
      if (!e)
        e = event

      if (e.offsetX) {
          this.mouseX = e.offsetX
          this.mouseY = e.offsetY
      }
      else if (e.layerX) {
          this.mouseX = e.layerX
          this.mouseY = e.layerY
      }
   },
    sketchpad_touchMove(e) {
        this.getTouchPos(e)
        this.drawDot(this.ctx,this.touchX,this.touchY,3)
        event.preventDefault()
    },
    sketchpad_touchStart(e) {
        this.getTouchPos(e)
        this.drawDot(this.ctx,this.touchX,this.touchY,3)
        event.preventDefault()
    },
    calculateAge(dob) {
      const diff_ms = new Date(Date.now() - dob.getTime())
      return Math.abs(diff_ms.getUTCFullYear() - 1970)
    }
  },
  computed: {
    ...mapGetters('user', ['logged_in', 'user', 'loaded'])
  }
}
</script>
