using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;

namespace InstitutoCopacabanaAPI.Models
{  
    [FirestoreData]
    public class AttendanceModel
    {
        [FirestoreProperty]
        public string Id { get; set; } = Guid.NewGuid().ToString("N");

        [FirestoreProperty]
public required string StudentId { get; set; }


        [FirestoreProperty]
        public DateTime Date { get; set; }

        [FirestoreProperty]
        public bool IsPresent { get; set; }

        [FirestoreProperty]
        public string? Justification { get; set; }

        [FirestoreProperty]
        public required string RecordedBy { get; set; } // Id do professor ou secretário que registrou
    }
}