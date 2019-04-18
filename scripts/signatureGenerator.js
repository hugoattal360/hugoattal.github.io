String.prototype.cleanup = function() {
    return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
}

const baseLink = [
    {
        first: ["https://en.360learning.com/signup", "Start a free trial"],
        second: ["https://en.360learning.com/ebooks", "Read our publications"]
    },
    {
        first: ["https://fr.360learning.com/signup", "Testez gratuitement"],
        second: ["https://fr.360learning.com/libres-blancs", "Lisez nos publications"]
    },
    {
        first: ["#", "Book a meeting"],
        second: ["https://en.360learning.com/ebooks", "Read our ebooks"]
    },
    {
        first: ["#", "Prenez RDV"],
        second: ["https://fr.360learning.com/ebooks", "Lisez nos livres blancs"]
    },
    {
        first: ["https://support.360learning.com/hc/en-us ", "Visit our help center"],
        second: ["https://en.360learning.com/ebooks", "Read our ebooks"]
    },
    {
        first: ["https://support.360learning.com/hc/fr ", "Visitez notre centre d’aide"],
        second: ["https://fr.360learning.com/libres-blancs", "Lisez nos livres blancs"]
    }
];

function copySignature () {
    copyToClip(document.getElementById("render").innerHTML);
}

function copyToClip(str) {
    function listener(e) {
        e.clipboardData.setData("text/html", str);
        e.clipboardData.setData("text/plain", str);
        e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
};

var app = new Vue({
    el: '#app',
    data: {
        firstName: "",
        lastName: "",
        jobTitle: "",
        linksType: 0,
        customLink: "",
        photoLink: "",
        phoneNumber: "",
        address: 0
    },
    computed: {
        firstLink: function () {
            if ((this.linksType==2)||(this.linksType==3))
            {
                return this.customLink;
            }
            return baseLink[this.linksType].first[0]+"?utm_source=signature&utm_medium=email_corpo&utm_campaign="+this.firstNameGen.cleanup()+"_"+this.lastNameGen.cleanup();
        },
        secondLink: function () {
            return baseLink[this.linksType].second[0]+"?utm_source=signature&utm_medium=email_corpo&utm_campaign="+this.firstNameGen.cleanup()+"_"+this.lastNameGen.cleanup();
        },
        firstLinkName: function () {
            return baseLink[this.linksType].first[1];
        },
        secondLinkName: function () {
            return baseLink[this.linksType].second[1];
        },
        firstNameGen: function () {
            return this.firstName || "Hugo";
        },
        lastNameGen: function () {
            return this.lastName || "Attal";
        },
        jobTitleGen: function () {
            return this.jobTitle || "Software Designer";
        },
        photoLinkGen: function () {
            return this.photoLink || "https://image.noelshack.com/fichiers/2019/16/4/1555583545-default-profil.png";
        },
        addressGen: function () {
            switch (parseInt(this.address))
            {
                case 1:
                    return "33 IRVING PLACE, NEW YORK, NY 10003";
                case 2:
                    return "No.3, 138 HOLBORN, LONDON EC1N2SW";
                default:
                    return "117 RUE DE LA TOUR, 75016 PARIS";
            }
        }
    }
});
