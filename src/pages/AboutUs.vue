<template>
<div class="container">
    <div class="about-container">
        <h1>Meet Our <span style="color: #f1bd03;"> Developer </span></h1>
        <p>Our project is being undertaken by a team of three individuals</p>
        <div class="img-container">
            <div class="card-img" v-for="(item,index) in imgSrc" :key="index">
                <img src='/images/${item.img}' alt="Image">
                <h3 style="font-size: larger;color: #EC4088;">{{ item.name }}</h3>
                <p style="color: gray;">{{ item.status }}</p>
                <p style="text-align: center;margin-top: 20px;"> {{ item.work }}</p>
            </div>
        </div>

    </div>
</div>
        <footer>
            <div class="footer-container">
                <div class="contact">
                    <h4>CONTACT US</h4>
                    <p style="font-weight:900;margin-top: 10px;"> <i class="bi bi-geo-alt-fill" style="margin-right: 10px;color: #f1bd03;"></i>Address: <span>8 Pho Si Road, Mak Khaeng Subdistrict, <br>Mueang Udon Thani District Udon Thani Province 41000</span></p>
                    <p style="font-weight:900;"> <i class="bi bi-telephone-fill" style="margin-right: 10px;color: #f1bd03;"></i>Phone: <span> +66 4224-6690</span></p>
                    <p style="font-weight:900;"> <i class="bi bi-envelope-fill" style="margin-right: 10px;color: #f1bd03;"></i>Email: <span>udvc@udvc.ac.th</span></p>
                </div>
                <div class="follow">
                    <h4>FOLLOW US</h4>
                    <p style="margin-top: 10px;"><i class="bi bi-facebook"></i><i class="bi bi-youtube"></i></p>
                </div>
            </div>
        </footer>
</template>

<script setup>
const imgSrc = [
    {
        name:'Pongsatorn Polsaeng',
        status:'Developer / Database Analyst',
        work:'"Doing Project as Front-End Developer, Back-End Developer and Database Manager"',
        img:'ninja.png'
    },
    {
        name:'Pimmada Suradanai',
        status:'Developer / Designer',
        work:'"Doing Project as User Interface Designer, Front-End Developer and Document Supporter"',
        img:'pim.png'
    },  
    {
        name:'Natthawadee Intaput',
        status:'Developer /Supporter',
        work:'"Doing Project as Front-End Developer, Document Supporter and Database Manager"',
        img:'gib.png'
    }
];
</script>

<style scoped>
.about-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
    color: white;
}

.about-container h1{
    font-size: 40px;
}

.img-container{
    display: flex;
    flex-direction: row;
    padding: 20px;
    justify-content: space-around;
    width: 100%;
}
.card-img{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: aliceblue;
    width: 350px;
    height: 400px;
    border-radius: 10px;
    padding: 20px;
    color: black;
    margin-right: 10px;
}

.card-img:hover{
    transform: scale(1.01);
    transition: transform 0.5s;
}

.card-img img{
    border-radius: 50%;
    width: 200px;
    height: 200px;
}

footer{
    background-color: #333;
    width: 100%;
    padding: 30px;
}
.footer-container{
    display: flex;
    flex-direction: row;
    align-items: start;
    color: white;
}

.footer-container h4{
    font-size: 20px;
}

.follow{
    margin-left: 40px;
}

.follow i{
    margin-right: 20px;
    font-size: large;
}
.follow i:hover{
    color: #f1bd03;
    cursor: pointer;
}

.contact{
    margin-left: 5%;
}
</style>